
import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';
import ServicoCriacaoGrupoPrivado from '../ServicosBackend/Servicos.Criacao.Grupo.Privado.js';

class ControleCriacaoGrupoPrivado {
    async handle(req, res) {
        try {
            const creatorId = req.user.id;
            const dadosGrupo = req.body;

            if (!dadosGrupo.name) {
                return ServicoHTTPResposta.erro(res, 'O nome do grupo é obrigatório.', 400);
            }

            const grupoCriado = await ServicoCriacaoGrupoPrivado.criar(dadosGrupo, creatorId);
            return ServicoHTTPResposta.sucesso(res, grupoCriado, 201);

        } catch (error) {
            console.error("Erro no controlador ao criar grupo privado:", error);
            return ServicoHTTPResposta.erro(res, 'Erro interno do servidor', 500);
        }
    }
}

export default new ControleCriacaoGrupoPrivado();
