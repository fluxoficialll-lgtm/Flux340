import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';
import ServicoCriacaoGrupoPublico from '../ServicosBackend/Servicos.Criacao.Grupo.Publico.js';

class ControleCriacaoGrupoPublico {
    async handle(req, res) {
        try {
            // 1. Extrair dados brutos do request
            const donoId = req.user.id;
            const dadosDoRequest = req.body; // { nome, descricao, limiteMembros }

            // 2. Montar um objeto de dados para o serviço
            const dadosParaServico = {
                ...dadosDoRequest,
                donoId: donoId,
            };

            // 3. Chamar o serviço com os dados brutos
            const grupoSalvo = await ServicoCriacaoGrupoPublico.criar(dadosParaServico);

            // 4. Retornar a resposta (o serviço retornará o objeto formatado)
            return ServicoHTTPResposta.sucesso(res, grupoSalvo, 201);

        } catch (error) {
            // Erros de validação (do serviço/modelo) ou outros erros
            console.error("Erro no controlador ao criar grupo público:", error.message);
            return ServicoHTTPResposta.erro(res, error.message, 400); // Repassa o erro
        }
    }
}

export default new ControleCriacaoGrupoPublico();
