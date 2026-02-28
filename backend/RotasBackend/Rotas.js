
import express from 'express';

// Importando as novas rotas de autenticação e o novo serviço de perfil
import rotasCriacaoConta from './Rotas.Criação.Conta.Flux.js';
import rotasCriacaoPerfilFlux from './Rotas.Criação.Perfil.Flux.js';

// Importando as rotas de publicação
import rotasPublicacaoFeed from './Rotas.Publicacao.Feed.js';
import rotasCriacaoGrupoPublico from './Rotas.Criação.Grupo.Publico.js';
import rotasCriacaoGrupoPrivado from './Rotas.Criação.Grupo.Privado.js';
import rotasCriacaoGrupoPago from './Rotas.Criação.Grupo.Pago.js';

// Importando as rotas dos provedores de pagamento
import rotasSyncPay from './Rotas.Provedor.SyncPay.js';
import rotasPayPal from './Rotas.Provedor.PayPal.js';
import rotasStripe from './Rotas.Provedor.Stripe.js';
import rotasCredencialStripe from './Rotas.Gestao.Credencial.Stripe.js';

// Importando a nova rota de gestão de variáveis
import rotasGestaoVariaveis from './Rotas.Gestão.Variáveis.js';

const router = express.Router();

// Rota de Configuração (ex: /api/v1/config/boot)
router.use('/v1/config', rotasGestaoVariaveis);

// Rotas de Autenticação (ex: /api/auth/register, /api/auth/login)
router.use('/auth', rotasCriacaoConta);

// Rotas de Gestão de Perfil (ex: /api/profiles/:userId)
router.use('/profiles', rotasCriacaoPerfilFlux);

// Rotas de Publicação
router.use('/feed', rotasPublicacaoFeed);
router.use('/groups/public', rotasCriacaoGrupoPublico);
router.use('/groups/private', rotasCriacaoGrupoPrivado);
router.use('/groups/paid', rotasCriacaoGrupoPago);

// ---- Rotas dos Provedores de Pagamento ----
router.use('/syncpay', rotasSyncPay);
router.use('/paypal', rotasPayPal);
router.use('/stripe', rotasStripe);
router.use('/credenciais-stripe', rotasCredencialStripe);

export default router;
