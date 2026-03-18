import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';
import ServicoCriacaoGrupoPrivado from '../ServicosBackend/Servicos.Criacao.Grupo.Privado.js';

class ControleCriacaoGrupoPrivado {
    async handle(req, res) {
        try {
            // 1. Extrair dados do request
            const donoId = req.user.id;
            const dadosDoRequest = req.body; // { nome, descricao, limiteMembros }

            // 2. Montar objeto de dados para o serviço
            const dadosParaServico = {
                ...dadosDoRequest,
                donoId: donoId,
            };

            // 3. Chamar o serviço com os dados
            const grupoSalvo = await ServicoCriacaoGrupoPrivado.criar(dadosParaServico);

            // 4. Retornar a resposta formatada pelo serviço
            return ServicoHTTPResposta.sucesso(res, grupoSalvo, 201);

        } catch (error) {
            // Captura erros (incluindo validação do modelo via serviço)
            console.error("Erro no controlador ao criar grupo privado:", error.message);
            return ServicoHTTPResposta.erro(res, error.message, 400);
        }
    }
}

export default new ControleCriacaoGrupoPrivado();
