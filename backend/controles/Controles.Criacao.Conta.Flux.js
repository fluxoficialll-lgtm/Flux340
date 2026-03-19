
// backend/controles/Controles.Criacao.Conta.Flux.js

import { createLogger } from '../ServicosBackend/Logger.js';
import ServicoCriacaoConta from '../ServicosBackend/Servicos.Criacao.Conta.Flux.js';
// Importando o serviço de resposta!
import ServicoResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';

// Criando uma instância do logger com o escopo 'Auth'
const logger = createLogger('Auth');

class ControlesCriacaoConta {
  async criarConta(req, res) {
    const { email, senha, nome, nomeUsuario } = req.body;

    logger.info('AUTH_CREATE_ACCOUNT_START', { email, nomeUsuario });

    try {
      const novaConta = await ServicoCriacaoConta.criarConta(email, senha, nome, nomeUsuario);
      
      logger.info('AUTH_CREATE_ACCOUNT_SUCCESS', { userId: novaConta.id });
      
      // Usando o serviço de resposta para padronizar a resposta de sucesso
      return ServicoResposta.sucesso(res, novaConta, 201); // 201 = Created

    } catch (error) {
      logger.error('AUTH_CREATE_ACCOUNT_ERROR', error, { email });

      // Usando o serviço de resposta para padronizar as respostas de erro
      if (error.message === 'Email já em uso') {
        return ServicoResposta.erro(res, error.message, 409); // 409 = Conflict
      }
      
      return ServicoResposta.erro(res, 'Erro interno do servidor', 500);
    }
  }
}

export default new ControlesCriacaoConta();
