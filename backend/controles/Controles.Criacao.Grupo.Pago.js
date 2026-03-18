import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';
import ServicoCriacaoGrupoPago from '../ServicosBackend/Servicos.Criacao.Grupo.Pago.js';

class ControleCriacaoGrupoPago {
    async handle(req, res) {
        try {
            // 1. Extrair dados do request
            const donoId = req.user.id;
            const dadosDoRequest = req.body; // { nome, descricao, limiteMembros, preco }

            // 2. Montar objeto de dados para o serviço
            const dadosParaServico = {
                ...dadosDoRequest,
                donoId: donoId,
            };

            // 3. Chamar o serviço com os dados
            const grupoSalvo = await ServicoCriacaoGrupoPago.criar(dadosParaServico);

            // 4. Retornar a resposta formatada
            return ServicoHTTPResposta.sucesso(res, grupoSalvo, 201);

        } catch (error) {
            // Captura erros (incluindo validação do modelo via serviço)
            console.error("Erro no controlador ao criar grupo pago:", error.message);
            return ServicoHTTPResposta.erro(res, error.message, 400);
        }
    }
}

export default new ControleCriacaoGrupoPago();
