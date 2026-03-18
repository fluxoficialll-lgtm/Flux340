
import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';
import ServicoCriacaoGrupoPublico from '../ServicosBackend/Servicos.Criacao.Grupo.Publico.js';

class ControleCriacaoGrupoPublico {
    async handle(req, res) {
        try {
            // O ID do usuário virá do middleware de autenticação
            const creatorId = req.user.id;
            const dadosGrupo = req.body;

            if (!dadosGrupo.name) {
                return ServicoHTTPResposta.erro(res, 'O nome do grupo é obrigatório.', 400);
            }

            const grupoCriado = await ServicoCriacaoGrupoPublico.criar(dadosGrupo, creatorId);
            return ServicoHTTPResposta.sucesso(res, grupoCriado, 201);

        } catch (error) {
            console.error("Erro no controlador ao criar grupo público:", error);
            return ServicoHTTPResposta.erro(res, 'Erro interno do servidor', 500);
        }
    }
}

export default new ControleCriacaoGrupoPublico();
