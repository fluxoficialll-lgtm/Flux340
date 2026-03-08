// Arquivo: ServiçosFrontend/ServiçoDeSincronização/Servico.Sincronizacao.Conta.Flux.js

import ClienteBackend from '../Cliente.Backend.js';

/**
 * Serviço para sincronização de dados da conta do usuário "Flux".
 *
 * Este serviço é responsável por buscar os dados mais recentes da conta do usuário
 * do backend e disponibilizá-los para a aplicação.
 */
class ServicoSincronizacaoContaFlux {
    constructor() {
        this.dadosDaConta = null;
        this.estado = 'ocioso'; // ocioso, sincronizando, sucesso, erro
        this.ultimoErro = null;
    }

    /**
     * Inicia o processo de sincronização dos dados da conta.
     *
     * @param {boolean} forcar - Se verdadeiro, força a sincronização mesmo que já tenha sido feita.
     * @returns {Promise<object>} Os dados da conta sincronizados.
     * @throws {Error} Se a sincronização falhar.
     */
    async sincronizar(forcar = false) {
        if (this.estado === 'sincronizando') {
            console.log('Sincronização da conta já em andamento.');
            // Poderíamos retornar uma promessa que resolve quando a sincronização atual terminar
            return;
        }

        if (this.estado === 'sucesso' && !forcar) {
            console.log('Dados da conta já estão sincronizados. Usando cache.');
            return this.dadosDaConta;
        }

        this.estado = 'sincronizando';
        this.ultimoErro = null;

        try {
            console.log('Iniciando sincronização dos dados da conta Flux...');

            // Usamos o ClienteBackend para buscar os dados do perfil do usuário logado.
            // O endpoint '/api/v1/perfil/meu' é uma suposição e deve ser ajustado para o seu backend.
            const responseData = await ClienteBackend.get('/api/v1/perfil/meu');

            if (!responseData || !responseData.perfil) {
                throw new Error("A resposta da API não contém os dados do perfil esperados.");
            }
            
            this.dadosDaConta = responseData.perfil;
            this.estado = 'sucesso';

            console.log('Sincronização da conta Flux concluída com sucesso.');

            // Dispara um evento customizado para notificar outras partes da aplicação (ex: hooks do React)
            window.dispatchEvent(new CustomEvent('flux-conta-sincronizada', { detail: this.dadosDaConta }));

            return this.dadosDaConta;
        } catch (error) {
            console.error('Falha ao sincronizar dados da conta Flux:', error);
            this.estado = 'erro';
            this.ultimoErro = error;
            
            // Propaga o erro para que a interface do usuário possa reagir
            throw error;
        }
    }

    /**
     * Retorna os últimos dados da conta que foram sincronizados.
     *
     * @returns {object | null} Os dados da conta ou null se nunca sincronizado.
     */
    getDadosDaConta() {
        return this.dadosDaConta;
    }

    /**
     * Retorna o estado atual da sincronização.
     *
     * @returns {'ocioso' | 'sincronizando' | 'sucesso' | 'erro'}
     */
    getEstado() {
        return this.estado;
    }

    /**
     * Limpa os dados da conta e redefine o estado. Útil ao fazer logout.
     */
    reset() {
        this.dadosDaConta = null;
        this.estado = 'ocioso';
        this.ultimoErro = null;
        console.log('Serviço de sincronização da conta resetado.');
    }
}

// Exporta uma instância única do serviço (padrão Singleton) para ser usada em toda a aplicação.
export const servicoSincronizacaoContaFlux = new ServicoSincronizacaoContaFlux();
