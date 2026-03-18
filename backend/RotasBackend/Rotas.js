
import express from 'express';
// Importa o nosso novo middleware de contexto de log
import requestContextMiddleware from '../config/Middleware.Logs.js';

// --- Rotas de Infraestrutura e Autenticação ---
import rotasGestaoVariaveis from './Rotas.Gestao.Variaveis.js';
import rotasCriacaoConta from './Rotas.Criacao.Conta.Flux.js';
import rotasCriacaoPerfilFlux from './Rotas.Criacao.Perfil.Flux.js';

// --- Rotas de Canais de Conteúdo ---
// Feed (Posts)
import rotasPublicacaoFeed from './Rotas.Publicacao.Feed.js';
import rotasComentariosFeed from './Rotas.Publicacao.Comentarios.Feed.js';

// Marketplace
import rotasPublicacaoMarketplace from './Rotas.Publicacao.Marketplace.js';
import rotasComentariosMarketplace from './Rotas.Publicacao.Comentarios.Marketplace.js';

// Reels
import rotasPublicacaoReels from './Rotas.Publicacao.Reels.js';
import rotasComentariosReels from './Rotas.Publicacao.Comentarios.Reels.js';

//Conversas
import rotasConversas from './Rotas.Conversas.js';

// --- Rotas de Grupos (Legado ou Futuro) ---
import rotasCriacaoGrupoPublico from './Rotas.Criacao.Grupo.Publico.js';
import rotasCriacaoGrupoPrivado from './Rotas.Criacao.Grupo.Privado.js';
import rotasCriacaoGrupoPago from './Rotas.Criacao.Grupo.Pago.js';

// --- Rotas de Pagamento (Legado ou Futuro) ---
import rotasSyncPay from './Rotas.Provedor.SyncPay.js';
import rotasPayPal from './Rotas.Provedor.PayPal.js';
import rotasStripe from './Rotas.Provedor.Stripe.js';
import rotasCredencialStripe from './Rotas.Gestao.Credencial.Stripe.js';

const router = express.Router();

// Aplica o middleware de contexto de log a TODAS as rotas.
// Esta deve ser uma das primeiras declarações de `use`.
router.use(requestContextMiddleware);

// --- Configuração e Autenticação ---
router.use('/v1/config', rotasGestaoVariaveis);
router.use('/auth', rotasCriacaoConta);
router.use('/profiles', rotasCriacaoPerfilFlux);

// --- Canais Principais ---

// Feed
router.use('/feed', rotasPublicacaoFeed);
router.use('/comments', rotasComentariosFeed);

// Marketplace
router.use('/marketplace/items', rotasPublicacaoMarketplace);
router.use('/marketplace/comments', rotasComentariosMarketplace);

// Reels
router.use('/reels', rotasPublicacaoReels);
router.use('/reels/comments', rotasComentariosReels);

//Conversas
router.use('/conversas', rotasConversas);

// --- Rotas Adicionais ---
router.use('/groups/public', rotasCriacaoGrupoPublico);
router.use('/groups/private', rotasCriacaoGrupoPrivado);
router.use('/groups/paid', rotasCriacaoGrupoPago);
router.use('/syncpay', rotasSyncPay);
router.use('/paypal', rotasPayPal);
router.use('/stripe', rotasStripe);
router.use('/credenciais-stripe', rotasCredencialStripe);

export default router;
