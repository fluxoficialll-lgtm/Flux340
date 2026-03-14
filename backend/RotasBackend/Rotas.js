
import express from 'express';

// --- Rotas de Infraestrutura e Autenticação ---
import rotasGestaoVariaveis from './Rotas.Gestao.Variaveis.js';
import rotasCriacaoConta from './Rotas.Criacao.Conta.Flux.js';
import rotasCriacaoPerfilFlux from './Rotas.Criacao.Perfil.Flux.js';

// --- Rota de Geolocalização ---
import rotasGeolocalizacao from './Rotas.Geolocalizacao.js';

// --- Rotas de Canais de Conteúdo ---
// Feed (Posts)
import rotasPublicacaoFeed from './Rotas.Publicacao.Feed.js';
import rotasComentariosFeed from './Rotas.Publicacao.Comentarios.Feed.js'; // Nome corrigido

// Marketplace
import rotasPublicacaoMarketplace from './Rotas.Publicacao.Marketplace.js';
import rotasComentariosMarketplace from './Rotas.Publicacao.Comentarios.Marketplace.js'; // Nome corrigido

// Reels
import rotasPublicacaoReels from './Rotas.Publicacao.Reels.js';
import rotasComentariosReels from './Rotas.Publicacao.Comentarios.Reels.js'; // Nome corrigido

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

// --- Configuração e Autenticação ---
router.use('/v1/config', rotasGestaoVariaveis);
router.use('/auth', rotasCriacaoConta);
router.use('/profiles', rotasCriacaoPerfilFlux);

// --- Geolocalização ---
router.use(rotasGeolocalizacao); // Usado diretamente na raiz da API

// --- Canais Principais ---

// Feed
router.use('/feed', rotasPublicacaoFeed); // Rota principal para posts e comentários aninhados
router.use('/comments', rotasComentariosFeed); // Rota para editar/deletar comentários

// Marketplace
router.use('/marketplace/items', rotasPublicacaoMarketplace); // Rota principal para itens e comentários aninhados
router.use('/marketplace/comments', rotasComentariosMarketplace); // Rota para editar/deletar comentários

// Reels
router.use('/reels', rotasPublicacaoReels); // Rota principal para reels e comentários aninhados
router.use('/reels/comments', rotasComentariosReels); // Rota para editar/deletar comentários

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
