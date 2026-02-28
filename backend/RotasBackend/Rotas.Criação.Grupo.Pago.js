
import express from 'express';
import ControleCriacaoGrupoPago from '../controles/Controles.Criação.Grupo.Pago.js';
import authMiddleware from '../meu-software-de-servidor/autenticar.js';

const router = express.Router();

// @route   POST /api/groups/paid
// @desc    Criar um novo grupo pago (VIP)
// @access  Private
router.post('/', authMiddleware, ControleCriacaoGrupoPago.handle);

export default router;
