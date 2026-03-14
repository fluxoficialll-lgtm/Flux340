
const express = require('express');
const router = express.Router();
const ControleGeolocalizacao = require('../controles/Controle.Geolocalizacao');

// Endpoint para determinar a página de vendas com base na geolocalização do IP
router.get('/vendas/redirecionar-por-ip', ControleGeolocalizacao.obterPaginaDeVendasPorIp);

module.exports = router;
