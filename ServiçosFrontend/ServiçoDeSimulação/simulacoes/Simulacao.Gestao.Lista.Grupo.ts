
import { Group } from '../../../tipos/types.Grupo';

/**
 * @file Dados simulados para a lista de grupos.
 *
 * Este arquivo exporta arrays de grupos mocados para serem usados em modo de simulação,
 * permitindo o desenvolvimento e teste da interface do usuário sem a necessidade de um backend funcional.
 */

// Simula um ID de usuário para referência nos dados mocados
const SIMULATED_USER_ID = 'user-123-simulado';

/**
 * Lista de grupos públicos simulados.
 */
export const mockPublicGroups: Group[] = [
  {
    id: 'public-group-1',
    name: 'Fãs de Tecnologia 🚀',
    description: 'Um grupo para discutir as últimas notícias de tecnologia, gadgets e inovação.',
    creatorId: 'user-abc',
    memberIds: [SIMULATED_USER_ID, 'user-xyz', 'user-def'],
    isPublic: true,
    isVip: false,
    unreadCount: 3,
  },
  {
    id: 'public-group-2',
    name: 'Culinária para Iniciantes 🍳',
    description: 'Compartilhe receitas fáceis e dicas de culinária. Todos são bem-vindos!',
    creatorId: 'user-ghi',
    memberIds: ['user-jkl'],
    isPublic: true,
    isVip: false,
    unreadCount: 0,
  },
];

/**
 * Lista de grupos que pertencem ao usuário simulado (seus grupos).
 */
export const mockMyGroups: Group[] = [
    {
        id: 'my-group-1',
        name: 'Projeto Secreto do Bairro 🤫',
        description: 'Grupo para organizar a festa surpresa do Zé.',
        creatorId: SIMULATED_USER_ID, // O usuário simulado é o criador
        memberIds: [SIMULATED_USER_ID, 'user-friend-1', 'user-friend-2'],
        isPublic: false,
        isVip: false,
        unreadCount: 5,
      },
      {
        id: 'public-group-1', // Grupo público do qual o usuário também faz parte
        name: 'Fãs de Tecnologia 🚀',
        description: 'Um grupo para discutir as últimas notícias de tecnologia, gadgets e inovação.',
        creatorId: 'user-abc',
        memberIds: [SIMULATED_USER_ID, 'user-xyz', 'user-def'],
        isPublic: true,
        isVip: false,
        unreadCount: 3,
      },
];
