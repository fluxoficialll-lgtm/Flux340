
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { groupService } from '../ServiçosFrontend/ServiçoDeGrupos/groupService';

// --- Importando os novos serviços refatorados ---
import { ServicoGestaoCredencialPayPal } from '../ServiçosFrontend/ServiçoDeProvedoresDePagamentos/ServiçoGestãoCredencialPayPal.js';
import { ServicoGestaoCredencialStripe } from '../ServiçosFrontend/ServiçoDeProvedoresDePagamentos/ServiçoGestãoCredencialStripe.js';
import { ServicoGestaoCredencialSyncPay } from '../ServiçosFrontend/ServiçoDeProvedoresDePagamentos/ServiçoGestãoCredencialSyncPay.js';

import { Group } from '../types';

/**
 * Hook customizado para gerenciar a configuração de provedores de pagamento de um grupo.
 *
 * Ele lida com a lógica de:
 * - Conectar/Desconectar provedores.
 * - Enviar credenciais.
 * - Selecionar o provedor ativo para o grupo.
 * - Manter o estado da UI sincronizado com o backend.
 */
export const useProviderConfig = () => {
    const { groupId } = useParams<{ groupId: string }>();
    const [group, setGroup] = useState<Group | null>(null);
    const [activeProviderId, setActiveProviderId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Função para buscar e atualizar o estado do grupo a partir do serviço
    const updateGroupState = useCallback(async () => {
        if (!groupId) return;
        setIsLoading(true);
        try {
            // Nota: Assumindo que groupService pode buscar dados de forma assíncrona no futuro.
            const updatedGroup = await groupService.getGroupById(groupId);
            setGroup(updatedGroup ?? null);
            setActiveProviderId(updatedGroup?.activePaymentProvider || null);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.';
            setError(message);
            console.error("Falha ao buscar estado do grupo:", err);
        } finally {
            setIsLoading(false);
        }
    }, [groupId]);

    useEffect(() => {
        updateGroupState();
    }, [updateGroupState]);

    // Lida com a submissão de credenciais (apenas para SyncPay)
    const handleCredentialsSubmit = useCallback(async (providerId: string, credentials: any) => {
        if (!groupId || providerId !== 'syncpay') return;
        setIsLoading(true);
        setError(null);
        try {
            await ServicoGestaoCredencialSyncPay.salvarCredenciais(credentials);
            // Após salvar, o ideal é que a UI reflita o estado conectado.
            // A lógica de `groupService` precisa ser atualizada para refletir isso.
            // Por enquanto, vamos chamar updateGroupState para pegar o status mais recente.
            await updateGroupState(); 
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Falha ao salvar credenciais.';
            setError(message);
            console.error(`Falha ao conectar ${providerId}:`, err);
        }
    }, [groupId, updateGroupState]);

    // Lida com a conexão via OAuth (Stripe, PayPal)
    const handleConnect = useCallback(async (providerId: string) => {
        setError(null);
        try {
            const returnUrl = `${window.location.origin}/group/${groupId}/settings/payments?provider=${providerId}&status=success`;
            const refreshUrl = `${window.location.origin}/group/${groupId}/settings/payments`;

            if (providerId === 'stripe') {
                await ServicoGestaoCredencialStripe.conectarConta(returnUrl, refreshUrl);
                // A página será redirecionada pelo serviço, não há mais nada a fazer aqui.
            } else if (providerId === 'paypal') {
                await ServicoGestaoCredencialPayPal.conectarConta(returnUrl);
                 // A página será redirecionada pelo serviço.
            }
        } catch (err) {
             const message = err instanceof Error ? err.message : `Falha ao iniciar conexão com ${providerId}.`;
             setError(message);
             console.error(`Falha na conexão com ${providerId}:`, err);
        }
    }, [groupId]);

    // Lida com a desconexão de qualquer provedor
    const handleDisconnect = useCallback(async (providerId: string) => {
        if (!groupId) return;
        setIsLoading(true);
        setError(null);

        const serviceMap: { [key: string]: () => Promise<any> } = {
            paypal: ServicoGestaoCredencialPayPal.desconectarConta,
            stripe: ServicoGestaoCredencialStripe.desconectarConta,
            syncpay: ServicoGestaoCredencialSyncPay.desconectarConta,
        };

        try {
            await serviceMap[providerId]();
            await updateGroupState(); // Atualiza a UI para refletir a desconexão
        } catch (err) {
            const message = err instanceof Error ? err.message : `Falha ao desconectar ${providerId}.`;
            setError(message);
            console.error(`Falha ao desconectar ${providerId}:`, err);
        } finally {
            setIsLoading(false);
        }
    }, [groupId, updateGroupState]);

    // Seleciona um provedor já conectado como o ativo
    const handleSelectProvider = useCallback(async (providerId: string) => {
        if (!groupId) return;
        // Lógica para verificar se o provedor está realmente conectado antes de selecionar
        // const providerConfig = group?.paymentConfig?.[providerId];
        // if (!providerConfig?.isConnected) return;

        setIsLoading(true);
        try {
            // O backend deve definir o provedor como ativo
            // await someApiService.setActiveProvider(groupId, providerId);
            await updateGroupState();
        } catch (err) {
             const message = err instanceof Error ? err.message : `Falha ao selecionar ${providerId}.`;
             setError(message);
        } finally {
            setIsLoading(false);
        }
    }, [groupId, updateGroupState]);

    return {
        group,
        activeProviderId,
        isLoading,
        error,
        handleCredentialsSubmit,
        handleConnect, // Nova função para OAuth
        handleDisconnect,
        handleSelectProvider
    };
};
