
import express from 'express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Importando as novas rotas de autenticação e usuário
const rotasCriacaoConta = require('./Rotas.Criação.Conta.Flux.js');
const rotasGestaoPerfil = require('./Rotas.Gestao.Perfil.js'); // Importando a nova rota

// Importando as rotas de publicação
const rotasPublicacaoFeed = require('./Rotas.Publicacao.Feed.js');
const rotasCriacaoGrupoPublico = require('./Rotas.Criação.Grupo.Publico.js');
const rotasCriacaoGrupoPrivado = require('./Rotas.Criação.Grupo.Privado.js');
const rotasCriacaoGrupoPago = require('./Rotas.Criação.Grupo.Pago.js');

// Importando as rotas dos provedores de pagamento
const rotasSyncPay = require('./Rotas.Provedor.SyncPay.js');
const rotasPayPal = require('./Rotas.Provedor.PayPal.js');
const rotasStripe = require('./Rotas.Provedor.Stripe.js');
const rotasCredencialStripe = require('./Rotas.Gestao.Credencial.Stripe.js');

// Importando a nova rota de gestão de variáveis
const rotasGestaoVariaveis = require('./Rotas.Gestão.Variáveis.js');

const router = express.Router();

// Rota de Configuração (ex: /api/v1/config/boot)
router.use('/v1/config', rotasGestaoVariaveis);

// Rotas de Autenticação (ex: /api/auth/register, /api/auth/login)
router.use('/auth', rotasCriacaoConta);

// Rotas de Publicação
router.use('/feed', rotasPublicacaoFeed);
router.use('/groups/public', rotasCriacaoGrupoPublico);
router.use('/groups/private', rotasCriacaoGrupoPrivado);
router.use('/groups/paid', rotasCriacaoGrupoPago);

// Rotas de Gestão de Perfil (ex: /api/users/:id)
router.use('/', rotasGestaoPerfil); // Adicionando a nova rota

// ---- Rotas dos Provedores de Pagamento ----
router.use('/syncpay', rotasSyncPay);
router.use('/paypal', rotasPayPal);
router.use('/stripe', rotasStripe);
router.use('/credenciais-stripe', rotasCredencialStripe);

export default router;
