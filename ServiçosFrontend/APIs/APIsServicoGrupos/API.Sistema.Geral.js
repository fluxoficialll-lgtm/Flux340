
import ClienteBackend from '../../Cliente.Backend.js';

const API_Sistema_Geral = {

    // --- Detalhes, Configurações e Estatísticas ---

    obterDetalhes(idGrupo) {
        return ClienteBackend.get(`/groups/${idGrupo}`);
    },

    atualizarConfiguracoes(idGrupo, configuracoes) {
        return ClienteBackend.put(`/groups/${idGrupo}/settings`, configuracoes);
    },

    obterEstatisticas(idGrupo) {
        return ClienteBackend.get(`/groups/${idGrupo}/stats`);
    },

    // --- Diretrizes do Grupo ---

    obterDiretrizes(idGrupo) {
        return ClienteBackend.get(`/groups/${idGrupo}/guidelines`);
    },

    atualizarDiretrizes(idGrupo, diretrizes) {
        return ClienteBackend.put(`/groups/${idGrupo}/guidelines`, diretrizes);
    },

    // --- Configurações de Notificação ---

    obterConfiguracoesNotificacao(idGrupo) {
        return ClienteBackend.get(`/groups/${idGrupo}/notification-settings`);
    },

    atualizarConfiguracoesNotificacao(idGrupo, configuracoes) {
        return ClienteBackend.put(`/groups/${idGrupo}/notification-settings`, configuracoes);
    },
};

export default API_Sistema_Geral;
