
import ServicoCriacaoGrupoPublico from '../ServicosBackend/Servicos.Criacao.Grupo.Publico.js';

class ControleCriacaoGrupoPublico {
    async handle(req, res) {
        try {
            // O ID do usuário virá do middleware de autenticação
            const creatorId = req.user.id;
            const dadosGrupo = req.body;

            if (!dadosGrupo.name) {
                return res.status(400).json({ message: 'O nome do grupo é obrigatório.' });
            }

            const grupoCriado = await ServicoCriacaoGrupoPublico.criar(dadosGrupo, creatorId);
            return res.status(201).json(grupoCriado);

        } catch (error) {
            console.error("Erro no controlador ao criar grupo público:", error);
            return res.status(500).json({ message: error.message || 'Erro interno do servidor' });
        }
    }
}

export default new ControleCriacaoGrupoPublico();
