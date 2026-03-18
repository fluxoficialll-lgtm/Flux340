
import Stripe from 'stripe';
import config from '../config/Variaveis.Backend.js';
import SistemaTaxasStripe from '../ServicosBackend/Sistema.Taxas.Stripe.js';
import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';

let stripe = null;
if (config.stripeSecretKey) {
    stripe = new Stripe(config.stripeSecretKey);
}

const getSellerStripeAccountId = async (sellerEmail) => {
    console.log(`Buscando ID da conta Stripe para: ${sellerEmail}`);
    return 'acct_1PGGceR5gdo2V8nF'; 
};

const createPaymentIntent = async (req, res) => {
    if (!stripe) {
        return ServicoHTTPResposta.servicoIndisponivel(res, "O sistema de pagamentos não está configurado. Contate o suporte.");
    }

    const { amount, currency, creatorEmail } = req.body;

    if (!creatorEmail) {
        return ServicoHTTPResposta.requisicaoMalSucedida(res, "O e-mail do criador é obrigatório para processar o pagamento.");
    }

    try {
        const destinationAccountId = await getSellerStripeAccountId(creatorEmail);
        
        if (!destinationAccountId) {
            return ServicoHTTPResposta.naoEncontrado(res, "A conta de pagamento do vendedor não foi encontrada ou não está conectada.");
        }

        const applicationFee = SistemaTaxasStripe.calcularTaxaPlataforma(amount);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            application_fee_amount: applicationFee,
            transfer_data: {
                destination: destinationAccountId,
            },
        });

        ServicoHTTPResposta.criado(res, { clientSecret: paymentIntent.client_secret });

    } catch (error) {
        console.error("Erro ao criar Payment Intent no Stripe Connect:", error);
        ServicoHTTPResposta.erro(res, error.message, 400, error);
    }
};

const checkSessionStatus = async (req, res) => {
    if (!stripe) {
        return ServicoHTTPResposta.servicoIndisponivel(res, "O sistema de pagamentos não está configurado. Contate o suporte.");
    }

    const { sessionId } = req.params;

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        ServicoHTTPResposta.sucesso(res, { status: session.status, payment_status: session.payment_status });
    } catch (error) {
        ServicoHTTPResposta.erro(res, error.message, 400, error);
    }
};

export default {
    createPaymentIntent,
    checkSessionStatus
};
