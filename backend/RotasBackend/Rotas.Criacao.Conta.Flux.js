
import express from 'express';
import controleCriacaoConta from '../controles/Controles.Criacao.Conta.Flux.js';
import ServicoLog from '../ServicosBackend/Servico.Logs.Backend.js';

const router = express.Router();

router.post('/register', (req, res, next) => {
  ServicoLog.jsonRecebido('Rota /register', req.body);
  controleCriacaoConta.registerUser(req, res, next);
});

router.post('/login', (req, res, next) => {
  ServicoLog.jsonRecebido('Rota /login', req.body);
  controleCriacaoConta.loginUser(req, res, next);
});

router.post('/google', (req, res, next) => {
  ServicoLog.jsonRecebido('Rota /google', req.body);
  controleCriacaoConta.googleAuth(req, res, next);
});

export default router;
