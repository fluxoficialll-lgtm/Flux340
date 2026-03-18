
import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';

// Funções de controle para o provedor PayPal

const createAccountLink = (req, res) => {
    const data = { url: "https://www.paypal.com/br/home" };
    ServicoHTTPResposta.sucesso(res, data, "Rota para criar link de conta PayPal funcionando!");
};

const getAccountDetails = (req, res) => {
    ServicoHTTPResposta.sucesso(res, null, "Rota para buscar detalhes de conta PayPal funcionando!");
};

const disconnectAccount = (req, res) => {
    ServicoHTTPResposta.sucesso(res, null, "Rota para desconectar conta PayPal funcionando!");
};

const createOrder = (req, res) => {
    ServicoHTTPResposta.criado(res, null, "Rota para criar ordem de pagamento PayPal funcionando!");
};

const checkOrderStatus = (req, res) => {
    ServicoHTTPResposta.sucesso(res, null, `Rota para verificar status da ordem ${req.params.orderId} do PayPal funcionando!`);
};

export default {
    createAccountLink,
    getAccountDetails,
    disconnectAccount,
    createOrder,
    checkOrderStatus
};
