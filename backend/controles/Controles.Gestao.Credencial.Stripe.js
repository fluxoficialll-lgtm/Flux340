
import Stripe from 'stripe';
import config from '../config/Variaveis.Backend.js';

const stripe = new Stripe(config.stripeSecretKey);

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

export default {
    createAccountLink,
    getAccountDetails,
    disconnectAccount
};
