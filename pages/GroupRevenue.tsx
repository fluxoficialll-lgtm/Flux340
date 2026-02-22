
import React, { useMemo } from 'react';
import { useGroupRevenue } from '../hooks/useGroupRevenue';
import { CurrencyCode } from '../types';

// Subcomponentes Modulares
import { RevenueHeader } from '../Componentes/ComponentesDeGroups/Componentes/ComponentesDeReceitaDoGrupo/RevenueHeader';
import { RevenueSummaryCard } from '../Componentes/ComponentesDeGroups/Componentes/ComponentesDeReceitaDoGrupo/RevenueSummaryCard';
import { RevenueMetricsGrid } from '../Componentes/ComponentesDeGroups/Componentes/ComponentesDeReceitaDoGrupo/RevenueMetricsGrid';
import { PaymentMixCard } from '../Componentes/ComponentesDeGroups/Componentes/ComponentesDeReceitaDoGrupo/PaymentMixCard';

const CURRENCY_CONFIG: Record<CurrencyCode, { symbol: string; color: string; flag: string; }> = {
    BRL: { symbol: 'R$', color: '#00ff82', flag: '🇧🇷' },
    USD: { symbol: '$', color: '#00c2ff', flag: '🇺🇸' },
    EUR: { symbol: '€', color: '#ffd700', flag: '🇪🇺' }
};

export const GroupRevenue: React.FC = () => {
    const {
        group,
        loading,
        isConverting,
        stats,
        selectedCurrency,
        setSelectedCurrency,
        locale,
        navigate
    } = useGroupRevenue();

    const formatVal = (val: number) => {
        return val.toLocaleString(locale, { 
            style: 'currency', currency: selectedCurrency 
        });
    };

    const metricItems = useMemo(() => {
        if (!stats) return [];
        return [
            { label: 'Hoje', value: formatVal(stats.hoje) },
            { label: 'Ontem', value: formatVal(stats.ontem) },
            { label: '30d', value: formatVal(stats.d30) },
            { label: '60d', value: formatVal(stats.d60) },
            { label: '90d', value: formatVal(stats.d90) },
            { label: '180d', value: formatVal(stats.d180) }
        ];
    }, [stats, selectedCurrency, locale]);

    return (
        <div className="min-h-screen bg-[#0a0c10] text-white font-['Inter'] flex flex-col pb-10 overflow-x-hidden">
            <style>{`
                .currency-pill {
                    padding: 8px 16px; border-radius: 12px; font-size: 11px; font-weight: 800; cursor: pointer; transition: 0.2s;
                    border: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.02); color: #555; text-transform: uppercase;
                }
                .currency-pill.active { color: #fff; background: rgba(255,255,255,0.05); border-color: #00c2ff; }
            `}</style>
            
            <RevenueHeader onBack={() => navigate(-1)} groupName={group?.name || 'Carregando...'} />

            <main className="p-5 max-w-[600px] mx-auto w-full no-scrollbar">
                <div className="flex justify-center gap-3 mb-8 p-1.5 bg-black/40 rounded-2xl border border-white/5 w-fit mx-auto">
                    {(Object.keys(CURRENCY_CONFIG) as CurrencyCode[]).map(curr => (
                        <button key={curr} className={`currency-pill ${selectedCurrency === curr ? 'active' : ''}`} onClick={() => setSelectedCurrency(curr)}>
                            {CURRENCY_CONFIG[curr].flag} {curr}
                        </button>
                    ))}
                </div>

                {loading || !stats ? (
                    <div className="flex flex-col items-center justify-center py-24 opacity-30">
                        <i className="fa-solid fa-circle-notch fa-spin text-2xl text-[#00c2ff] mb-4"></i>
                        <p className="text-[10px] font-black uppercase tracking-[3px]">Auditoria Financeira...</p>
                    </div>
                ) : (
                    <div className="animate-fade-in relative">
                        {isConverting && (
                            <div className="absolute inset-0 bg-[#0a0c10]/60 backdrop-blur-sm z-20 flex items-center justify-center rounded-3xl">
                                <i className="fa-solid fa-rotate fa-spin text-[#00c2ff] text-2xl"></i>
                            </div>
                        )}

                        <RevenueSummaryCard 
                            totalAmount={formatVal(stats.total)}
                            totalSales={stats.totalSales}
                            avgTicket={stats.totalSales > 0 ? formatVal(stats.total / stats.totalSales) : formatVal(0)}
                            color={CURRENCY_CONFIG[selectedCurrency].color}
                        />

                        <RevenueMetricsGrid metrics={metricItems} />

                        <PaymentMixCard metrics={stats.unifiedMetrics} />

                        <div className="bg-white/5 p-5 rounded-2xl border border-dashed border-white/10 text-center opacity-40">
                             <p className="text-[9px] text-gray-500 uppercase font-black tracking-[2px] leading-relaxed">
                                <i className="fa-solid fa-shield-halved mr-1"></i> Inteligência Flux: Dados sincronizados em tempo real.
                             </p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
