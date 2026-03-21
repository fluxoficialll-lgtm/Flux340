
import { Grupo } from '../../../types/Saida/Types.Estrutura.Grupos';

/**
 * @file Dados simulados para os grupos que pertencem ao usuário ou dos quais ele participa.
 */

const ID_USUARIO_SIMULADO = 'user-123-simulado';

export const mockMeusGrupos: Grupo[] = [
  {
    id: 'meu-grupo-privado-1',
    nome: 'Clube do Livro Secreto',
    descricao: 'Discussões literárias sem spoilers. Apenas para membros convidados.',
    tipo: 'privado',
    donoId: ID_USUARIO_SIMULADO,
    dataCriacao: '2023-10-26T10:00:00Z',
    imagemCapa: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    tipoAcesso: 'convite',
  },
  {
    id: 'meu-grupo-pago-1',
    nome: 'Consultoria de Investimentos VIP',
    descricao: 'Análises de mercado exclusivas, dicas de investimento e relatórios semanais.',
    tipo: 'pago',
    preco: 99.90,
    moeda: 'BRL',
    donoId: ID_USUARIO_SIMULADO,
    dataCriacao: '2024-01-15T14:30:00Z',
    limiteMembros: 100,
    imagemCapa: 'https://images.unsplash.com/photo-1640622300473-977435c38c04?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    tipoAcesso: 'direto',
    provedorPagamentoId: 'stripe-conn-123',
    vipDoor: {
        text: 'Acesso exclusivo para membros VIP. Desbloqueie análises de mercado agora!',
        buttonText: 'Tornar-se VIP',
        media: [{ url: 'https://example.com/video-promo.mp4', type: 'video' }]
    },
    pixel: {
        id: 'meta-pixel-12345',
        token: 'ABC-DEF-123'
    }
  },
  {
    id: 'grupo-terceiro-publico-1',
    nome: 'Desenvolvedores ReactBR',
    descricao: 'Comunidade para desenvolvedores React trocarem experiências, dicas e vagas.',
    tipo: 'publico',
    donoId: 'user-dev-lead-456',
    dataCriacao: '2022-05-20T20:00:00Z',
    imagemCapa: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    tipoAcesso: 'direto',
  },
];
