
// ServiçosFrontend/ServiçoDeProvedoresDePagamentos/SistemaPayPal.js

/**
 * Este módulo encapsula a interação com a API do PayPal para processamento de pagamentos.
 */

export const SistemaPayPal = {

    /**
     * Inicia o fluxo para conectar a conta PayPal de um usuário (vendedor).
     * @param {string} userId - O ID do usuário no seu sistema.
     * @returns {Promise<object>} - Contém a URL de redirecionamento para o fluxo de conexão do PayPal.
     */
    async connectAccount(userId) {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch('/api/payments/paypal/connect', { // Endpoint no seu backend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
            throw new Error('Falha ao iniciar a conexão da conta PayPal.');
        }

        return response.json(); // Deve retornar { redirectUrl: '...' }
    },

    /**
     * Cria uma ordem de pagamento no PayPal e retorna um link de aprovação.
     * @param {object} paymentData - Dados do pagamento (ex: { amount, currency, recipientId, description }).
     * @returns {Promise<object>} - Contém o link para o qual o usuário deve ser redirecionado para aprovar o pagamento.
     */
    async processPayment(paymentData) {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch('/api/payments/paypal/create-payment', { // Endpoint no seu backend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(paymentData),
        });

        if (!response.ok) {
            throw new Error('Falha ao criar o pagamento com o PayPal.');
        }

        // O frontend redirecionará o usuário para este link para que ele aprove o pagamento
        return response.json(); // Deve retornar { approvalUrl: '...' }
    },

    /**
     * Captura o pagamento após o usuário aprová-lo no site do PayPal.
     * @param {string} orderId - O ID da ordem fornecido pelo PayPal na URL de retorno.
     * @returns {Promise<object>} - O status final da transação.
     */
    async capturePayment(orderId) {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch('/api/payments/paypal/capture-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({ orderId }),
        });

        if (!response.ok) {
            throw new Error('Falha ao capturar o pagamento do PayPal.');
        }

        return response.json(); // Deve retornar { status: 'COMPLETED' | '... '}
    }
};
