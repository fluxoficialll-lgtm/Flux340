
import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';

// Funções de controle para o provedor SyncPay

const saveCredentials = (req, res) => {
    ServicoHTTPResposta.criado(res, null, "Rota para salvar credenciais do SyncPay funcionando!");
};

const disconnectAccount = (req, res) => {
    ServicoHTTPResposta.sucesso(res, null, "Rota para desconectar conta do SyncPay funcionando!");
};

const createPayment = (req, res) => {
    ServicoHTTPResposta.criado(res, null, "Rota para criar pagamento com SyncPay funcionando!");
};

const checkTransactionStatus = (req, res) => {
    ServicoHTTPResposta.sucesso(res, null, "Rota para verificar status de transação do SyncPay funcionando!");
};

export default {
    saveCredentials,
    disconnectAccount,
    createPayment,
    checkTransactionStatus
};
