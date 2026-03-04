
import { useState, useEffect } from 'react';
// CORREÇÃO: A importação do groupService foi removida.
// import { groupService } from '../../../../ServiçosFrontend/ServiçoDeGrupos/groupService.js';
import { AuditLog } from '../../../../types';

export const useGroupAuditLogs = (groupId: string | undefined) => {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);

    const loadLogs = () => {
        if (!groupId) return;
        setLoading(true);
        try {
            // CORREÇÃO: Lógica de busca de grupo removida.
            // O hook agora carrega diretamente os dados de demonstração.
            const auditData = [
                { 
                    id: '1', 
                    adminId: '1', 
                    adminName: 'Sistema Flux (Simulação)', 
                    action: 'Criação do Grupo', 
                    target: 'Estrutura inicial do grupo configurada', 
                    timestamp: Date.now() - 7200000 
                },
                {
                    id: '2', 
                    adminId: '2', 
                    adminName: 'Admin (Simulação)', 
                    action: 'Atualização de Configuração', 
                    target: 'Alteradas permissões de membros', 
                    timestamp: Date.now() - 3600000 
                }
            ];
            setLogs(auditData.sort((a, b) => b.timestamp - a.timestamp));
        } catch (e) {
            console.error("Erro ao carregar logs (simulados):", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLogs();
    }, [groupId]);

    return {
        logs,
        loading,
        refresh: loadLogs
    };
};
