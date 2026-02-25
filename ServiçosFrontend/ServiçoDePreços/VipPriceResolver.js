
// import { geoService } from '../ServiçoDeGeolocalizacao/geoService.js'; // Dependência removida temporariamente
import { currencyService } from '../ServiçoDeMoeda/currencyService.js';

export const VipPriceResolver = {
    async detectUserGeo() {
        // Retorna um valor padrão para evitar quebrar a lógica dependente
        return { country_code: 'BR' }; 
    },

    async resolvePrice(group, geoData) {
        if (!group) {
            return null;
        }

        // Usa o geoData (agora mockado) ou um padrão, para manter a lógica de preços
        const resolvedGeo = geoData || { country_code: 'BR' };
        const targetCurrency = resolvedGeo.country_code === 'BR' ? 'BRL' : 'USD';
        const price = group.prices[targetCurrency];

        if (!price) {
            return null;
        }

        return await currencyService.convert(price, targetCurrency);
    }
};