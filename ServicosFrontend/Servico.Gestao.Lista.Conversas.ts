
/**
 * @file Serviço para gerenciamento de listas de conversas.
 * 
 * Este serviço é responsável por todas as operações relacionadas a
 * listas de conversas de um usuário, incluindo:
 * - Buscar a lista de conversas.
 * - Fixar ou desafixar conversas.
 * - Marcar conversas como lidas.
 * - Arquivar ou desarquivar conversas.
 */

// import { chatApi } from '../APIs/chatApi'; // Exemplo de importação da API
import { Usuario } from '../../../types/Saida/Types.Estrutura.Usuario';
import { Mensagem } from '../../../types/Saida/Types.Estrutura.Mensagem';

// --- Tipos e Interfaces ---

export interface ResumoConversa {
    id: string;
    nome: string; // Nome do grupo ou do contato
    imagemUrl?: string; // URL da imagem de perfil do contato ou do grupo
    participantes: Partial<Usuario>[];
    ultimaMensagem: Mensagem | null;
    contagemNaoLidas: number;
    isFixada: boolean;
    isArquivada: boolean;
    isGrupo: boolean;
    timestamp: number; // Timestamp da última mensagem para ordenação
}

// --- Lógica do Serviço ---

class ServicoGestaoListaConversas {
    
    /**
     * Busca e retorna a lista de resumos de conversas para o usuário logado.
     * @returns {Promise<ResumoConversa[]>} Uma promessa que resolve com a lista de conversas.
     */
    async getListaDeConversas(): Promise<ResumoConversa[]> {
        console.log("Buscando lista de conversas do usuário...");
        try {
            // Exemplo de como a chamada à API poderia ser:
            // const response = await chatApi.get('/conversations/summary');
            // return response.data;
            
            // Por enquanto, vamos retornar dados mocados para desenvolvimento.
            const mockData: ResumoConversa[] = [
                {
                    id: '1',
                    nome: 'Grupo da Família',
                    imagemUrl: 'https://placehold.co/100x100',
                    participantes: [{ id: 'user1', nome: 'Você' }, { id: 'user2', nome: 'Mãe' }],
                    ultimaMensagem: { id: 'msg1', conteudo: 'Não esquece o pão!', timestamp: Date.now() - 10000, remetenteId: 'user2' },
                    contagemNaoLidas: 2,
                    isFixada: true,
                    isArquivada: false,
                    isGrupo: true,
                    timestamp: Date.now() - 10000,
                },
                {
                    id: '2',
                    nome: 'João da Silva',
                    imagemUrl: 'https://placehold.co/100x100',
                    participantes: [{ id: 'user1', nome: 'Você' }, { id: 'user3', nome: 'João' }],
                    ultimaMensagem: { id: 'msg2', conteudo: 'Opa, tudo certo?', timestamp: Date.now() - 50000, remetenteId: 'user3' },
                    contagemNaoLidas: 0,
                    isFixada: false,
                    isArquivada: false,
                    isGrupo: false,
                    timestamp: Date.now() - 50000,
                },
            ];
            
            return Promise.resolve(mockData);

        } catch (error) {
            console.error("Erro ao buscar a lista de conversas:", error);
            throw new Error("Não foi possível carregar suas conversas.");
        }
    }

    /**
     * Fixa uma conversa específica no topo da lista.
     * @param {string} conversationId - O ID da conversa a ser fixada.
     */
    async fixarConversa(conversationId: string): Promise<void> {
        console.log(`Fixando a conversa ${conversationId}...`);
        // Lógica de chamada à API:
        // await chatApi.post(`/conversations/${conversationId}/pin`);
        console.log(`Conversa ${conversationId} fixada.`);
    }

    /**
     * Desafixa uma conversa específica.
     * @param {string} conversationId - O ID da conversa a ser desafixada.
     */
    async desafixarConversa(conversationId: string): Promise<void> {
        console.log(`Desafixando a conversa ${conversationId}...`);
        // Lógica de chamada à API:
        // await chatApi.delete(`/conversations/${conversationId}/pin`);
        console.log(`Conversa ${conversationId} desafixada.`);
    }
    
    // Outros métodos como arquivar, marcar como lida, etc., podem ser adicionados aqui.
}


// --- Exportação da Instância Singleton ---
// Usamos um singleton para garantir que haja apenas uma instância do serviço na aplicação.
export const servicoGestaoListaConversas = new ServicoGestaoListaConversas();
