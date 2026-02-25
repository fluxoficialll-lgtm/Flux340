
import paypal from '@paypal/checkout-server-sdk';
import { getPaypalKeys, savePaypalCredentials, findUserById, getPaypalMerchantId, savePaypalMerchantId } from '../../GerenciadoresDeDados/financial.repositorio.js';

// --- Configuração do Ambiente PayPal ---

function getClient(clientId, clientSecret) {
    // A alternância entre Sandbox e Produção deve ser baseada em variáveis de ambiente
    const environment = process.env.NODE_ENV === 'production'
        ? new paypal.core.LiveEnvironment(clientId, clientSecret)
        : new paypal.core.SandboxEnvironment(clientId, clientSecret);
    return new paypal.core.PayPalHttpClient(environment);
}

// Função auxiliar para fazer chamadas à API REST do PayPal que não estão no SDK
async function fetchPayPalApi(endpoint, { clientId, clientSecret }, method = 'GET', body = null) {
    const client = getClient(clientId, clientSecret);
    const accessTokenRequest = new paypal.core.AccessTokenRequest();
    const accessToken = await client.execute(accessTokenRequest);

    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';
    const response = await fetch(`${baseUrl}${endpoint}`,
        {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken.result.access_token}`
            },
            body: body ? JSON.stringify(body) : null,
        });
    return response.json();
}


export const paypalGatewayService = {

    // --- Funções de Gerenciamento de Conta --- 

    /**
     * Cria um link de inscrição do PayPal para o vendedor.
     * Este link inicia o fluxo de onboarding do PayPal.
     */
    async createAccountLink(userId, returnUrl, refreshUrl, traceId) {
        console.log(`[${traceId}] Gerando link de inscrição do PayPal para o usuário ${userId}.`);
        const paypalKeys = await getPaypalKeys(userId, traceId); // As chaves principais da plataforma
        const user = await findUserById(userId, traceId);

        // O "link" é uma URL construída para o fluxo de inscrição do PayPal Connect
        const partnerId = process.env.PAYPAL_PARTNER_ID; // Você precisa obter isso do seu painel de desenvolvedor do PayPal
        const btoa = (str) => Buffer.from(str).toString('base64');
        const sellerNonce = btoa(JSON.stringify({ "state": `nonce_${new Date().getTime()}` })); // Um valor único
        
        // A URL de retorno é onde o PayPal redirecionará o usuário após a conclusão.
        // É CRÍTICO que você tenha um endpoint no seu backend para lidar com isso.
        const actionRenewalUrl = `https://www.sandbox.paypal.com/bizsignup/partner/entry?partnerId=${partnerId}&partnerClientId=${paypalKeys.clientId}&returnToPartnerUrl=${returnUrl}&product=EXPRESS_CHECKOUT&integrationType=TPI&features=PAYMENT,REFUND&sellerNonce=${sellerNonce}`;

        return actionRenewalUrl;
    },

    /**
     * Obtém os detalhes da conta de um vendedor no PayPal.
     * Requer a API de Referências de Parceiros.
     */
    async getAccountDetails(userId, traceId) {
        console.log(`[${traceId}] Buscando detalhes da conta PayPal para o usuário ${userId}.`);
        const merchantId = await getPaypalMerchantId(userId, traceId);
        if (!merchantId) {
            throw { statusCode: 404, message: 'Nenhum ID de comerciante do PayPal encontrado para este usuário.' };
        }

        const platformKeys = await getPaypalKeys(userId, traceId); // Chaves da plataforma
        const partnerId = process.env.PAYPAL_PARTNER_ID;
        
        // Este endpoint busca o status de um comerciante onboarded
        const endpoint = `/v1/customer/partners/${partnerId}/merchant-integrations/${merchantId}`;
        const accountDetails = await fetchPayPalApi(endpoint, platformKeys);
        
        return accountDetails;
    },

    /**
     * Verifica o status da conta de um vendedor no PayPal.
     */
    async getAccountStatus(userId, traceId) {
        console.log(`[${traceId}] Verificando o status da conta PayPal para o usuário ${userId}.`);
        const details = await this.getAccountDetails(userId, traceId);

        if (!details || details.error) {
             return { connected: false, message: 'Conta não encontrada ou erro na API.' };
        }

        const isConnected = details.primary_email_confirmed && details.payments_receivable;
        return {
            connected: isConnected,
            detailsSubmitted: details.primary_email_confirmed,
            chargesEnabled: details.payments_receivable,
            payoutsEnabled: details.oauth_integrations ? true : false, // Um indicador de que a integração OAuth está ativa
        };
    },

    // --- Funções de Pagamento (já existentes) ---
    async verifyCredentials(clientId, clientSecret, traceId) {
        console.log(`[${traceId}] Verificando as credenciais do PayPal.`);
        try {
            await getClient(clientId, clientSecret).execute(new paypal.core.AccessTokenRequest());
            return { success: true, message: 'Credenciais do PayPal válidas.' };
        } catch (error) {
            throw { statusCode: 401, message: 'Credenciais do PayPal inválidas.' };
        }
    },

    async disconnect(userId, traceId) {
        console.log(`[${traceId}] Desconectando o PayPal para o usuário ${userId}.`);
        await savePaypalMerchantId(userId, null, traceId);
        // Também pode ser necessário revogar o token de acesso via API, se aplicável
        return { success: true, message: 'Provedor desconectado com sucesso.' };
    },

    async createOrder(orderData, traceId) {
        console.log(`[${traceId}] Criando ordem de pagamento no PayPal.`);
        const paypalKeys = await getPaypalKeys(orderData.userId, traceId);
        const client = getClient(paypalKeys.clientId, paypalKeys.clientSecret);

        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'BRL',
                    value: orderData.amount
                }
            }]
        });

        const order = await client.execute(request);
        return { orderID: order.result.id };
    },

    async checkStatus(statusData, traceId) {
        console.log(`[${traceId}] Verificando status da ordem no PayPal.`);
        const paypalKeys = await getPaypalKeys(statusData.userId, traceId);
        const client = getClient(paypalKeys.clientId, paypalKeys.clientSecret);

        const request = new paypal.orders.OrdersGetRequest(statusData.orderID);
        const order = await client.execute(request);

        return { status: order.result.status };
    },
};
