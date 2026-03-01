
import ServicoCriacaoGrupoPrivado from '../ServicosBackend/Servicos.Criacao.Grupo.Privado.js';

class ControleCriacaoGrupoPrivado {
    async handle(req, res) {
        try {
            const creatorId = req.user.id;
            const dadosGrupo = req.body;

            if (!dadosGrupo.name) {
                return res.status(400).json({ message: 'O nome do grupo é obrigatório.' });
            }

            const grupoCriado = await ServicoCriacaoGrupoPrivado.criar(dadosGrupo, creatorId);
            return res.status(201).json(grupoCriado);

        } catch (error) {
            console.error("Erro no controlador ao criar grupo privado:", error);
            return res.status(500).json({ message: error.message || 'Erro interno do servidor' });
        }
    }
}

export default new ControleCriacaoGrupoPrivado();
