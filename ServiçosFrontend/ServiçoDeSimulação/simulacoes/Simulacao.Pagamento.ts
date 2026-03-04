
// /ServiçosFrontend/ServiçoDeSimulação/simulacoes/Simulacao.Pagamento.ts

/**
 * Este arquivo contém dados mockados para simular a resposta da API de checkout.
 * Ele permite visualizar o fluxo de pagamento no frontend sem a necessidade de um backend funcional.
 */

// Tipagem para uma opção de pagamento individual (ex: Pix, Boleto, Cartão)
interface PaymentMethod {
    method: string; // 'pix', 'boleto', 'card', 'paypal_redirect'
    details: any;   // Dados específicos para cada método
}

// Tipagem para a resposta completa do checkout simulado
export interface SimulatedCheckoutResponse {
    provider: 'syncpay' | 'stripe' | 'paypal';
    country: string;
    paymentMethods: PaymentMethod[];
}

// ====================================================================
// DADOS SIMULADOS PARA CADA PROVEDOR E PAÍS
// ====================================================================

const SIMULACAO_SYNCPAY_BR: SimulatedCheckoutResponse = {
    provider: 'syncpay',
    country: 'BR',
    paymentMethods: [
        {
            method: 'pix',
            details: {
                qrCode: 'https://servidor-gerador-de-qrcode.com.br/api/v1/2d?data=00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-4266141740005204000053039865802BR5913NOME DO VENDEDOR6008BRASILIA62070503***6304E2A7',
                copiaECola: '00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-4266141740005204000053039865802BR5913NOME DO VENDEDOR6008BRASILIA62070503***6304E2A7'
            }
        },
        {
            method: 'boleto',
            details: {
                codigoDeBarras: '34191.79001 01234.567890 12345.678901 2 93820000019900',
                linhaDigitavel: '34191.79001 01234.567890 12345.678901 2 93820000019900',
                urlBoleto: 'https://sitedobanco.com/boleto/id_do_boleto_aqui'
            }
        }
    ]
};

const SIMULACAO_STRIPE_US: SimulatedCheckoutResponse = {
    provider: 'stripe',
    country: 'US',
    paymentMethods: [
        {
            method: 'card',
            details: {
                requiresForm: true
            }
        }
    ]
};

const SIMULACAO_PAYPAL_GLOBAL: SimulatedCheckoutResponse = {
    provider: 'paypal',
    country: 'GLOBAL',
    paymentMethods: [
        {
            method: 'paypal_redirect',
            details: {
                redirectUrl: 'https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-1234567890ABCDEF'
            }
        }
    ]
};

/**
 * Retorna os dados de pagamento simulados para um provedor e país específicos.
 * @param provider O provedor de pagamento ('syncpay', 'stripe', 'paypal').
 * @param countryCode O código do país (ex: 'BR', 'US').
 * @returns Um objeto com os dados do checkout simulado ou nulo se a combinação não for encontrada.
 */
export const getSimulatedPaymentData = (provider: 'syncpay' | 'stripe' | 'paypal', countryCode: string): SimulatedCheckoutResponse | null => {
    
    if (provider === 'syncpay' && countryCode === 'BR') {
        return SIMULACAO_SYNCPAY_BR;
    }

    if (provider === 'stripe') {
        // Para o Stripe, podemos simplificar e retornar o mesmo para todos os países suportados no teste
        return { ...SIMULACAO_STRIPE_US, country: countryCode };
    }

    if (provider === 'paypal') {
        // PayPal também é global
        return { ...SIMULACAO_PAYPAL_GLOBAL, country: countryCode };
    }

    // Retorna nulo se a combinação não for suportada na simulação
    console.warn(`Dados de simulação não encontrados para: ${provider}, ${countryCode}`);
    return null;
};
