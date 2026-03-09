
import React from 'react';

// Define a interface para os dados de vendas do Stripe
interface FaturamentoGrupoStripeData {
    totalSales: number;
    approvedSales: number;
    pendingSales: number;
    salesUSD: number;
    salesBRL: number;
    salesEUR: number;
}

// Define as props do componente
interface FaturamentoGrupoStripeProps {
    salesData?: Partial<FaturamentoGrupoStripeData>; // Tornando as propriedades internas opcionais
    loading: boolean;
}

// Helper para formatar moeda
const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
};

// Componente para um item de métrica de contagem
const CountMetricItem: React.FC<{ icon: string; label: string; value: string; color?: string; }> = ({ icon, label, value, color = 'text-white' }) => (
    <div className="bg-white/[0.04] p-4 rounded-lg flex items-center gap-4">
        <div className="text-xl text-[#00c2ff]">
            <i className={`fa-solid ${icon}`}></i>
        </div>
        <div>
            <h4 className="text-sm text-white/70 font-medium">{label}</h4>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
    </div>
);

// Componente para um item de métrica de receita
const RevenueMetricItem: React.FC<{ icon: string; label: string; value: string; }> = ({ icon, label, value }) => (
    <div className="flex items-center justify-between bg-white/[0.04] p-3 rounded-lg">
        <div className="flex items-center gap-3">
            <i className={`fa-solid ${icon} text-white/50`}></i>
            <span className="text-white/80 font-medium">{label}</span>
        </div>
        <span className="font-bold text-white">{value}</span>
    </div>
);

export const FaturamentoGrupoStripe: React.FC<FaturamentoGrupoStripeProps> = ({ salesData, loading }) => {
    if (loading) {
        return (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 col-span-1 md:col-span-3">
                <h3 className="font-bold text-lg text-white/90 mb-1">Vendas via Stripe</h3>
                <p className="text-sm text-white/50 mb-6">Métricas de vendas processadas pela Stripe</p>
                <div className="flex justify-center items-center h-48">
                    <i className="fa-solid fa-circle-notch fa-spin text-2xl text-[#00c2ff]"></i>
                </div>
            </div>
        );
    }

    // Usando 0 como fallback para cada propriedade para evitar erros de 'undefined'
    const safeSalesData = {
        totalSales: salesData?.totalSales ?? 0,
        approvedSales: salesData?.approvedSales ?? 0,
        pendingSales: salesData?.pendingSales ?? 0,
        salesUSD: salesData?.salesUSD ?? 0,
        salesBRL: salesData?.salesBRL ?? 0,
        salesEUR: salesData?.salesEUR ?? 0,
    };

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 col-span-1 md:col-span-3 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00c2ff] to-transparent opacity-50"></div>
            <h3 className="font-bold text-lg text-white/90 mb-1">Vendas via Stripe</h3>
            <p className="text-sm text-white/50 mb-6">Métricas de vendas processadas pela Stripe</p>

            {/* Métricas de Contagem */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <CountMetricItem icon="fa-boxes-stacked" label="Vendas (Qtd.)" value={safeSalesData.totalSales.toLocaleString()} />
                <CountMetricItem icon="fa-check-circle" label="Aprovadas" value={safeSalesData.approvedSales.toLocaleString()} color="text-green-400" />
                <CountMetricItem icon="fa-hourglass-half" label="Pendentes" value={safeSalesData.pendingSales.toLocaleString()} color="text-yellow-400" />
            </div>

            {/* Métricas de Receita */}
            <div>
                <h4 className="font-semibold text-white/80 mb-3">Receita por Moeda</h4>
                <div className="space-y-2">
                    <RevenueMetricItem icon="fa-dollar-sign" label="Receita (USD)" value={formatCurrency(safeSalesData.salesUSD, 'USD')} />
                    <RevenueMetricItem icon="fa-brazilian-real-sign" label="Receita (BRL)" value={formatCurrency(safeSalesData.salesBRL, 'BRL')} />
                    <RevenueMetricItem icon="fa-euro-sign" label="Receita (EUR)" value={formatCurrency(safeSalesData.salesEUR, 'EUR')} />
                </div>
            </div>
        </div>
    );
};
