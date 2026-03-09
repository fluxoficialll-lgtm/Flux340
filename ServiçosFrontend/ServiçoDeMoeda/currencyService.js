
export const currencyService = {
    async convert(price, currency) {
        // Simulação de conversão de moeda
        return price;
    },
    getLocale(currency) {
        switch (currency) {
            case 'BRL':
                return 'pt-BR';
            case 'USD':
                return 'en-US';
            default:
                return 'en-US'; // Padrão para o dólar americano
        }
    }
};