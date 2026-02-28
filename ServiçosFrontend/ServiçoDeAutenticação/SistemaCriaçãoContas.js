
import gestorDeRequisicoes from './GestorRequisicoesContas';

/**
 * Sistema para gerenciar a criação de contas de usuário.
 * Interage com o backend para registrar novos usuários.
 */
export const SistemaCriaçãoContas = {

    /**
     * Cria uma nova conta de usuário no sistema.
     * @param {object} dadosDoUsuario - Os dados para o novo usuário (ex: nome, email, senha).
     * @returns {Promise<any>} A resposta do backend, geralmente contendo os dados do usuário criado.
     */
    async criarConta(dadosDoUsuario) {
        // Envia os dados do novo usuário para o endpoint de registro no backend.
        return gestorDeRequisicoes.post('/api/auth/register', dadosDoUsuario);
    }
};
