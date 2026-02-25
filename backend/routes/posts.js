
import express from 'express';
import postsControle from '../controles/postsControle.js';
import { authMiddleware } from '../middleware.js'; // Importando o nosso novo middleware

const router = express.Router();

// Rota para criar um novo post.
// Agora protegida pelo authMiddleware.
// 1. A requisição chega.
// 2. O authMiddleware é executado: verifica o token, busca o usuário e anexa ao `req`.
// 3. Se o middleware passar, a execução continua para `postsControle.createPost`.
router.post('/create', authMiddleware, postsControle.createPost);

// Rota para buscar todos os posts (pode continuar pública ou ser protegida também)
router.get('/', postsControle.getAllPosts);

// Rota para deletar um post (exemplo, também deve ser protegida)
router.delete('/:id', authMiddleware, postsControle.deletePost);

export default router;
