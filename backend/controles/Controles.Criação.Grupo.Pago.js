
import ServicoCriacaoGrupoPago from '../ServicosBackend/Servicos.Criação.Grupo.Pago.js';

class ControleCriacaoGrupoPago {
    async handle(req, res) {
        try {
            const creatorId = req.user.id;
            const dadosGrupo = req.body;

            // Validações básicas
            if (!dadosGrupo.groupName || !dadosGrupo.numericPrice) {
                return res.status(400).json({ message: 'Nome do grupo e preço são obrigatórios.' });
            }

            const grupoCriado = await ServicoCriacaoGrupoPago.criar(dadosGrupo, creatorId);
            return res.status(201).json(grupoCriado);

        } catch (error) {
            console.error("Erro no controlador ao criar grupo pago:", error);
            return res.status(500).json({ message: error.message || 'Erro interno do servidor' });
        }
    }
}

export default new ControleCriacaoGrupoPago();
