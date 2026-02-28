
import Stripe from 'stripe';
import config from '../config/Variaveis.Backend.js';
import SistemaTaxasStripe from '../ServicosBackend/Sistema.Taxas.Stripe.js'; // ATUALIZADO para o novo caminho

const stripe = new Stripe(config.stripeSecretKey);

// Simulação de busca no banco de dados. 
// Em um cenário real, você buscaria o ID da conta Stripe do vendedor no seu banco de dados.
const getSellerStripeAccountId = async (sellerEmail) => {
    // LÓGICA DE BANCO DE DADOS:
    // const user = await User.findOne({ where: { email: sellerEmail } });
    // return user.stripeAccountId;

    // Para fins de demonstração, vamos usar um ID de conta de teste do Stripe Connect.
    console.log(`Buscando ID da conta Stripe para: ${sellerEmail}`);
    // Este é um ID de conta de teste que SEMPRE funciona em modo de teste.
    return 'acct_1PGGceR5gdo2V8nF'; 
};


const createAccountLink = async (req, res) => {
    const { accountId, refresh_url, return_url } = req.body;

    try {
        const accountLink = await stripe.accountLinks.create({
            account: accountId,
            refresh_url: refresh_url,
            return_url: return_url,
            type: 'account_onboarding',
        });

        res.status(200).json({ url: accountLink.url });
    } catch (error) {
        res.status(400).json({ error: { message: error.message } });
    }
};

const getAccountDetails = async (req, res) => {
    const { accountId } = req.params;

    try {
        const account = await stripe.accounts.retrieve(accountId);
        res.status(200).json(account);
    } catch (error) {
        res.status(400).json({ error: { message: error.message } });
    }
};

const disconnectAccount = (req, res) => {
    res.status(200).json({ message: "Funcionalidade de desconexão a ser implementada no lado do seu aplicativo." });
};

const createPaymentIntent = async (req, res) => {
    const { amount, currency, creatorEmail } = req.body;

    if (!creatorEmail) {
        return res.status(400).json({ error: { message: "O e-mail do criador é obrigatório para processar o pagamento." } });
    }

    try {
        // 1. Encontrar o ID da conta Stripe do vendedor conectado.
        const destinationAccountId = await getSellerStripeAccountId(creatorEmail);
        
        if (!destinationAccountId) {
            return res.status(404).json({ error: { message: "A conta de pagamento do vendedor não foi encontrada ou não está conectada." } });
        }

        // 2. Calcular a taxa da plataforma usando o módulo de taxas.
        const applicationFee = SistemaTaxasStripe.calcularTaxaPlataforma(amount);

        // 3. Criar a Intenção de Pagamento com destino e taxa.
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            application_fee_amount: applicationFee,
            transfer_data: {
                destination: destinationAccountId,
            },
        });

        res.status(201).json({ clientSecret: paymentIntent.client_secret });

    } catch (error) {
        console.error("Erro ao criar Payment Intent no Stripe Connect:", error);
        res.status(400).json({ error: { message: error.message } });
    }
};

const checkSessionStatus = async (req, res) => {
    const { sessionId } = req.params;

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        res.status(200).json({ status: session.status, payment_status: session.payment_status });
    } catch (error) {
        res.status(400).json({ error: { message: error.message } });
    }
};

export default {
    createAccountLink,
    getAccountDetails,
    disconnectAccount,
    createPaymentIntent,
    checkSessionStatus
};
