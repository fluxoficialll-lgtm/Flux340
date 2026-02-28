
// backend/RotasBackend/Rotas.Gestao.Perfil.js

import { Router } from 'express';
import controlePerfil from '../controles/Controles.Gestao.Perfil.js';

const router = Router();

// Rota para buscar os dados de um perfil de usuário
router.get('/users/:id', controlePerfil.getUser);

// Rota para atualizar o perfil do usuário
router.put('/users/:id', controlePerfil.updateUser);

export default router;
