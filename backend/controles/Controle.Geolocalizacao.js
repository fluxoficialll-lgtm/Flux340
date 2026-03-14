
const axios = require('axios');

// Mapeamento de códigos de país para códigos de idioma.
// Isso pode ser expandido conforme necessário.
const languageMap = {
    'AU': 'en-AU',
    'US': 'en-US',
    'GB': 'en-GB',
    'BR': 'pt-BR',
    'PT': 'pt-PT',
    'DE': 'de-DE',
    'ES': 'es-ES',
    'FR': 'fr-FR',
    'JP': 'ja-JP',
};

// Idioma padrão caso o país não seja encontrado no mapa.
const defaultLanguage = 'en-US';

const obterIdiomaPorIp = async (req, res) => {
    // Em produção, o IP é extraído de headers como 'x-forwarded-for'.
    // Para desenvolvimento ou testes, podemos usar um IP fixo.
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '8.8.8.8'; // IP do Google DNS como fallback

    try {
        const geoResponse = await axios.get(`http://ip-api.com/json/${ip}?fields=status,message,countryCode`);

        if (geoResponse.data.status !== 'success') {
            throw new Error(geoResponse.data.message || 'Erro na API de geolocalização');
        }

        const countryCode = geoResponse.data.countryCode;
        const language = languageMap[countryCode] || defaultLanguage;

        res.json({ language });

    } catch (error) {
        console.error('Falha ao obter dados de geolocalização do IP:', error.message);
        // Em caso de erro, retorna o idioma padrão como fallback seguro.
        res.status(500).json({ language: defaultLanguage });
    }
};

module.exports = {
    obterIdiomaPorIp,
};
