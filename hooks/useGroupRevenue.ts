
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { groupService } from '../ServiçosFrontend/ServiçoDeGrupos/groupService';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
// --- Importando o novo serviço de transações ---
import { ServicoDeTransacoes } from '../ServiçosFrontend/ServiçoDeTransacoes/ServiçoDeTransacoes.js';
import { currencyService } from '../ServiçosFrontend/ServiçoDeMoeda/currencyService.js';
import { Group, CurrencyCode } from '../types';

// ... (interfaces UnifiedMetric e RevenueStats permanecem as mesmas)
interface UnifiedMetric {
    provider: string;
    method: string;
    country: string;
    count: number;
    percentage: number;
}

export interface RevenueStats {
    hoje: number;
    ontem: number;
    d30: number;
    d60: number;
    d90: number;
    d180: number;
    total: number;
    unifiedMetrics: UnifiedMetric[];
    totalSales: number;
}

export const useGroupRevenue = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [group, setGroup] = useState<Group | null>(null);
    const [loading, setLoading] = useState(true);
    const [isConverting, setIsConverting] = useState(false);
    const [statsBRL, setStatsBRL] = useState<RevenueStats | null>(null);
    const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('BRL');
    const [conversionRate, setConversionRate] = useState(1);

    const loadData = useCallback(async () => {
        const user = authService.getCurrentUser();
        if (!user || !id) {
            setLoading(false);
            return;
        }

        const foundGroup = groupService.getGroupById(id);
        if (foundGroup) setGroup(foundGroup);

        try {
            // --- Utilizando o novo serviço de transações ---
            // Ele buscará transações de todos os provedores para o grupo especificado.
            const groupTransactions = await ServicoDeTransacoes.obterTransacoes(id);

            const now = Date.now();
            const oneDay = 24 * 60 * 60 * 1000;
            const todayStart = new Date(new Date().setHours(0,0,0,0)).getTime();
            const yesterdayStart = todayStart - oneDay;

            const metricMap: Record<string, number> = {};
            const result: RevenueStats = {
                hoje: 0, ontem: 0, d30: 0, d60: 0, d90: 0, d180: 0, total: 0,
                unifiedMetrics: [],
                totalSales: groupTransactions.length
            };

            groupTransactions.forEach(t => {
                // Normaliza o campo de valor da transação
                const amount = parseFloat(t.amount || t.valor || '0');
                // Normaliza o campo de data da transação
                const ts = new Date(t.created_at || t.createdAt || t.date_created || 0).getTime();
                
                // Filtra apenas transações pagas/completas
                const isPaid = ['paid', 'completed', 'approved', 'settled'].includes((t.status || '').toLowerCase());
                if (!isPaid) {
                    result.totalSales -= 1; // Ajusta o total de vendas se a transação não for contada
                    return;
                }

                result.total += amount;

                if (ts >= todayStart) result.hoje += amount;
                else if (ts >= yesterdayStart && ts < todayStart) result.ontem += amount;

                if (ts >= now - (30 * oneDay)) result.d30 += amount;
                if (ts >= now - (60 * oneDay)) result.d60 += amount;
                if (ts >= now - (90 * oneDay)) result.d90 += amount;
                if (ts >= now - (180 * oneDay)) result.d180 += amount;
                
                // Normaliza os campos para as métricas unificadas
                const prov = (t.provider || t.provedor || 'desconhecido').toLowerCase();
                const meth = (t.method || t.metodo || 'não informado').split(' ')[0];
                const country = (t.country || t.pais || 'BR').toUpperCase();
                
                const key = `${prov}|${meth}|${country}`;
                metricMap[key] = (metricMap[key] || 0) + 1;
            });

            if (result.totalSales > 0) {
                result.unifiedMetrics = Object.entries(metricMap).map(([key, count]) => {
                    const [provider, method, country] = key.split('|');
                    return {
                        provider,
                        method,
                        country,
                        count,
                        percentage: (count / result.totalSales) * 100
                    };
                }).sort((a, b) => b.count - a.count);
            }

            setStatsBRL(result);
        } catch (e) {
            console.error("Erro ao carregar faturamento:", e);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => { loadData(); }, [loadData]);

    // Lógica de conversão de moeda (permanece a mesma)
    useEffect(() => {
        const updateRate = async () => {
            if (selectedCurrency === 'BRL') { setConversionRate(1); return; }
            setIsConverting(true);
            try {
                const rate = await currencyService.getRate('BRL', selectedCurrency);
                setConversionRate(rate);
            } catch (e) { console.error("Erro na conversão", e); }
            finally { setIsConverting(false); }
        };
        updateRate();
    }, [selectedCurrency]);

    const stats = useMemo(() => {
        if (!statsBRL) return null;
        if (conversionRate === 1) return statsBRL;
        const rate = conversionRate;
        return {
            ...statsBRL,
            hoje: statsBRL.hoje * rate, ontem: statsBRL.ontem * rate,
            d30: statsBRL.d30 * rate, d60: statsBRL.d60 * rate,
            d90: statsBRL.d90 * rate, d180: statsBRL.d180 * rate,
            total: statsBRL.total * rate
        };
    }, [statsBRL, conversionRate]);

    const locale = useMemo(() => currencyService.getLocale(selectedCurrency), [selectedCurrency]);

    return {
        group,
        loading,
        isConverting,
        stats,
        selectedCurrency,
        setSelectedCurrency,
        locale,
        navigate
    };
};
