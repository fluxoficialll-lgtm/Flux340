
import express from 'express';

// Importando as novas rotas de autenticação e usuário
import rotasCriacaoConta from './Rotas.Criação.Conta.Flux.js';

// Importando as rotas dos provedores de pagamento
import rotasSyncPay from './Rotas.Provedor.SyncPay.js';
import rotasPayPal from './Rotas.Provedor.PayPal.js';
import rotasStripe from './Rotas.Provedor.Stripe.js';

// ---- ROTAS COM CONTROLADORES AUSENTES (Desativadas Temporariamente) ----
// import rotasUsuario from './Rotas.Usuario.js'; 
// import RotasFeed from './Rotas.Publicacao.Feed.js';
// import RotasMarketplace from './Rotas.Publicacao.Marketplace.js';
// import RotasCampanha from './Rotas.Publicacao.Campanha.js';
// import RotasGrupos from './Rotas.Publicacao.Grupos.js';
// import RotasReels from './Rotas.Publicacao.Reels.js';

const router = express.Router();

// Agrupa as rotas importadas dos módulos sob seus respectivos prefixos

// Rotas de Autenticação (ex: /api/auth/register, /api/auth/login)
router.use('/auth', rotasCriacaoConta);

// ---- Rotas dos Provedores de Pagamento ----
router.use('/syncpay', rotasSyncPay);
router.use('/paypal', rotasPayPal);
router.use('/stripe', rotasStripe);

// ---- ROTAS COM CONTROLADORES AUSENTES (Desativadas Temporariamente) ----
// router.use('/users', rotasUsuario);
// router.use('/feed', RotasFeed);
// router.use('/marketplace', RotasMarketplace);
// router.use('/campaigns', RotasCampanha);
// router.use('/groups', RotasGrupos);
// router.use('/reels', RotasReels);

export default router;
