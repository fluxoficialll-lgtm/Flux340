
import express from 'express';
import { conversationRepositorio } from '../GerenciadoresDeDados/conversation.repositorio.js';
import { messageRepositorio } from '../GerenciadoresDeDados/message.repositorio.js';
import { groupRepositorio } from '../GerenciadoresDeDados/group.repositorio.js';
import { LogDeOperacoes } from '../ServiçosBackEnd/ServiçosDeLogsSofisticados/LogDeOperacoes.js';

const router = express.Router();

// Listar todas as conversas de um usuário
router.get('/', async (req, res) => {
    const userId = req.userId;
    LogDeOperacoes.log('TENTATIVA_LISTAR_CONVERSAS', { userId }, req.traceId);
    try {
        const conversations = await conversationRepositorio.listForUser(userId);
        res.json({ chats: conversations });
    } catch (e) {
        LogDeOperacoes.error('FALHA_LISTAR_CONVERSAS', { userId, error: e }, req.traceId);
        res.status(500).json({ error: e.message });
    }
});

// Buscar mensagens de uma conversa específica
router.get('/:conversationId', async (req, res) => {
    const { conversationId } = req.params;
    const userId = req.userId;
    const { limit, offset } = req.query;
    LogDeOperacoes.log('TENTATIVA_BUSCAR_MENSAGENS', { userId, conversationId }, req.traceId);

    try {
        const messages = await messageRepositorio.findByConversationId(conversationId, userId, limit, offset);
        res.json({ messages });
    } catch (e) {
        LogDeOperacoes.error('FALHA_BUSCAR_MENSAGENS', { userId, conversationId, error: e }, req.traceId);
        res.status(500).json({ error: e.message });
    }
});

// Enviar uma mensagem
router.post('/send', async (req, res) => {
    const senderId = req.userId;
    const { conversationId, content, isGroup, recipientId } = req.body;
    LogDeOperacoes.log('TENTATIVA_ENVIAR_MENSAGEM', { senderId, conversationId, isGroup, recipientId }, req.traceId);

    try {
        let convId = conversationId;

        // Se for uma DM e não tiver um ID de conversa, encontre ou crie a conversa privada
        if (!isGroup && !convId) {
            if (!recipientId) return res.status(400).json({ error: 'recipientId é obrigatório para novas DMs.' });
            const conversation = await conversationRepositorio.findOrCreatePrivateConversation(senderId, recipientId);
            convId = conversation.id;
        }

        // Se for uma conversa de grupo e não houver ID, encontre-o através do group_id
        if (isGroup && !convId) {
            const { groupId } = req.body;
            if (!groupId) return res.status(400).json({ error: 'groupId é obrigatório para mensagens de grupo.' });
            const conversation = await conversationRepositorio.findByGroupId(groupId);
            if (!conversation) return res.status(404).json({ error: 'Conversa de grupo não encontrada.' });
            convId = conversation.id;
        }

        const newMessage = await messageRepositorio.create(senderId, convId, content);

        // Emitir evento em tempo real
        if (req.io) {
            req.io.to(convId).emit('new_message', { conversationId: convId, message: newMessage });
        }

        LogDeOperacoes.log('SUCESSO_ENVIAR_MENSAGEM', { senderId, conversationId: convId }, req.traceId);
        res.status(201).json({ success: true, message: newMessage });

    } catch (e) {
        LogDeOperacoes.error('FALHA_ENVIAR_MENSAGEM', { senderId, error: e }, req.traceId);
        res.status(500).json({ error: e.message });
    }
});

// Deletar mensagens
router.delete('/messages', async (req, res) => {
    const userId = req.userId;
    const { messageIds, target } = req.body;
    const deleteAll = target === 'all';
    LogDeOperacoes.log('TENTATIVA_DELETAR_MENSAGENS', { userId, count: messageIds.length, target }, req.traceId);

    try {
        await messageRepositorio.deleteMessages(messageIds, userId, deleteAll);
        res.json({ success: true });
    } catch (e) {
        LogDeOperacoes.error('FALHA_DELETAR_MENSAGENS', { userId, error: e }, req.traceId);
        res.status(500).json({ error: e.message });
    }
});

export default router;
