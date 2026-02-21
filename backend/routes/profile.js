
import express from 'express';
import { userRepositorio } from '../GerenciadoresDeDados/user.repositorio.js';
import { LogDeOperacoes } from '../ServiçosBackEnd/ServiçosDeLogsSofisticados/LogDeOperacoes.js';

const router = express.Router();

// Rota para obter dados do perfil para edição
router.get('/edit', async (req, res) => {
    const userId = req.userId; // Middleware de autenticação deve fornecer isso
    LogDeOperacoes.log('TENTATIVA_GET_PERFIL_PARA_EDICAO', { userId }, req.traceId);

    if (!userId) {
        LogDeOperacoes.warn('GET_PERFIL_FALHA_AUTENTICACAO', {}, req.traceId);
        return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    try {
        const user = await userRepositorio.findById(userId);
        if (!user) {
            LogDeOperacoes.warn('GET_PERFIL_USUARIO_NAO_ENCONTRADO', { userId }, req.traceId);
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        LogDeOperacoes.log('SUCESSO_GET_PERFIL_PARA_EDICAO', { userId }, req.traceId);
        // Retorna apenas os campos que o usuário pode editar
        res.json({
            name: user.name,
            username: user.username,
            bio: user.bio,
            location: user.location,
            website: user.website,
            profilePictureUrl: user.profilePictureUrl,
            coverPhotoUrl: user.coverPhotoUrl
        });
    } catch (error) {
        LogDeOperacoes.error('FALHA_GET_PERFIL_PARA_EDICAO', { userId, error }, req.traceId);
        res.status(500).json({ error: 'Falha ao obter os dados do perfil.' });
    }
});

export default router;
