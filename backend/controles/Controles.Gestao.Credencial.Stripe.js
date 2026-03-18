
import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';
import Stripe from 'stripe';
import config from '../config/Variaveis.Backend.js';

let stripe = null;
if (config.stripeSecretKey) {
    stripe = new Stripe(config.stripeSecretKey);
}

const createAccountLink = async (req, res) => {
    if (!stripe) {
        return ServicoHTTPResposta.erro(res, "O sistema de pagamentos não está configurado. Contate o suporte.", 503);
    }

    const { accountId, refresh_url, return_url } = req.body;

    try {
        const accountLink = await stripe.accountLinks.create({
            account: accountId,
            refresh_url: refresh_url,
            return_url: return_url,
            type: 'account_onboarding',
        });

        return ServicoHTTPResposta.sucesso(res, { url: accountLink.url });
    } catch (error) {
        return ServicoHTTPResposta.erro(res, error.message, 400);
    }
};

const getAccountDetails = async (req, res) => {
    if (!stripe) {
        return ServicoHTTPResposta.erro(res, "O sistema de pagamentos não está configurado. Contate o suporte.", 503);
    }

    const { accountId } = req.params;

    try {
        const account = await stripe.accounts.retrieve(accountId);
        return ServicoHTTPResposta.sucesso(res, account);
    } catch (error) {
        return ServicoHTTPResposta.erro(res, error.message, 400);
    }
};

const disconnectAccount = (req, res) => {
    if (!stripe) {
        return ServicoHTTPResposta.erro(res, "O sistema de pagamentos não está configurado. Contate o suporte.", 503);
    }
    
    return ServicoHTTPResposta.sucesso(res, { message: "Funcionalidade de desconexão a ser implementada no lado do seu aplicativo." });
};

export default {
    createAccountLink,
    getAccountDetails,
    disconnectAccount
};
