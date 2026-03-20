
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
// CORREÇÃO: O caminho para o serviço de notificação foi ajustado.
import servicoNotificacao from '../ServiçosFrontend/ServicoNotificacao/Servico.Notificacao';
import { Notificacao, Grupo, InfoPreco } from '../types/Saida/Types.Estrutura.Notificacao';

export const HookNotificacoes = () => {
    const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [filtro, setFiltro] = useState('all');
    const [modalPagamentoAberto, setModalPagamentoAberto] = useState(false);
    const [grupoSelecionado, setGrupoSelecionado] = useState<Grupo | null>(null);
    const [infoPrecoExibicao, setInfoPrecoExibicao] = useState<InfoPreco | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const verificarAutenticacaoEBuscarDados = async () => {
            const estadoAtual = await authService.confirmarAutenticacao();

            if (estadoAtual.isAuthenticated) {
                setCarregando(true);
                try {
                    // A lógica de busca agora é tratada de forma transparente pelo serviço
                    const dados = await servicoNotificacao.buscarNotificacoes();
                    setNotificacoes(dados);
                } catch (error) {
                    console.error("HookNotificacoes: Erro ao buscar notificações:", error);
                    setNotificacoes([]);
                } finally {
                    setCarregando(false);
                }
            } else {
                navigate('/');
            }
        };

        verificarAutenticacaoEBuscarDados();

        const unsubscribe = authService.subscribe((estado) => {
            if (!estado.isAuthenticated) {
                navigate('/');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const alternarSeguir = useCallback(async (id: number, username: string) => {
        console.log('Ação de seguir/deixar de seguir não implementada.');
    }, []);

    const acaoPendente = useCallback(async (action: 'accept' | 'reject', notification: any) => {
        console.log('Ação pendente não implementada.');
    }, []);

    const ignorarExpiracao = useCallback((groupId: string) => {
        console.log('Ação de ignorar expiração não implementada.');
    }, []);

    const clicarPagar = useCallback(async (group: Grupo) => {
        console.log('Ação de pagamento não implementada.');
    }, []);

    const notificacoesFiltradas = useMemo(() => {
        return notificacoes.filter(notif => {
            if (filtro === 'all') return true;
            if (filtro === 'mentions') return notif.tipo === 'mention';
            if (filtro === 'follow') return notif.tipo === 'follow';
            if (filtro === 'likes') return notif.tipo === 'like';
            return false;
        });
    }, [notificacoes, filtro]);

    return {
        notificacoes,
        carregando,
        filtro,
        setFiltro,
        notificacoesFiltradas,
        modalPagamentoAberto,
        setModalPagamentoAberto,
        grupoSelecionado,
        infoExibicao: infoPrecoExibicao,
        alternarSeguir,
        acaoPendente,
        ignorarExpiracao,
        clicarPagar,
        navigate,
    };
};
