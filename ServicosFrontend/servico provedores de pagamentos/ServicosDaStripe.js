
// ServicosFrontend/servico provedores de pagamentos/ServicosDaStripe.js

/**
 * Entra em contato com o backend para criar um link de onboarding do Stripe Connect.
 * @param {object} payload - Os dados necessários para criar o link.
 * @param {string | null} [payload.accountId] - O ID da conta Stripe existente, se houver.
 * @param {string} payload.return_url - A URL para onde o usuário retorna após o sucesso.
 * @param {string} payload.refresh_url - A URL para onde o usuário retorna se o link expirar.
 * @returns {Promise<{url: string, accountId: string}>} A URL de onboarding e o ID da conta Stripe.
 */
export const createStripeAccountLink = async (payload) => {
    try {
        // Usa um caminho relativo para a chamada de API. 
        // Isso evita o erro 'process is not defined' e funciona em qualquer ambiente (dev, prod).
        const response = await fetch('/api/provedores/stripe/create-account-link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Se você usa autenticação, adicione o cabeçalho aqui
                // 'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Falha ao gerar link de conexão com a Stripe no servidor.');
        }

        return await response.json();

    } catch (error) {
        console.error("Erro detalhado ao chamar createStripeAccountLink:", error);
        throw error; // Re-lança o erro para o componente tratar
    }
};
