
import React from 'react';
import { useFinancialPanel } from '../hooks/useFinancialPanel';
import { BalanceCard } from '../Componentes/financial/BalanceCard';
import { AffiliateCard } from '../Componentes/financial/AffiliateCard';
import { GatewayCard } from '../Componentes/financial/GatewayCard';
import { CashFlowCard } from '../Componentes/financial/CashFlowCard';
import { TransactionsCard } from '../Componentes/financial/TransactionsCard';

export const FinancialPanel: React.FC = () => {
  const {
    selectedFilter, setSelectedFilter, activeProviderName, loading, preferredProvider, currencyStats,
    affiliateStats, pixelId, setPixelId, pixelToken, setPixelToken, isSavingMarketing, 
    isCopyingLink, filters, loadData, handleBack, navigate
  } = useFinancialPanel();

  return (
    <div className="h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-y-auto overflow-x-hidden">
      <header className="flex items-center justify-between p-4 bg-[#0c0f14] fixed w-full z-10 border-b border-white/10 top-0 h-[65px]">
        <button onClick={handleBack} aria-label="Voltar"><i className="fa-solid fa-arrow-left"></i></button>
        <h1 className="text-[20px] font-semibold">Painel Financeiro</h1>
        <div style={{width: '24px'}}></div>
      </header>
      <main className="pt-[80px] pb-[40px] w-full max-w-[600px] mx-auto px-5">
        <BalanceCard 
            stats={currencyStats}
            selectedFilter={selectedFilter}
            filters={filters}
            onFilterChange={setSelectedFilter}
            onRefresh={loadData}
            loading={loading}
            showCurrencySwitch={preferredProvider !== 'syncpay'}
        />
        
        <CashFlowCard />

        <TransactionsCard />

        {activeProviderName && 
          <AffiliateCard 
            affiliateStats={affiliateStats} 
            pixelId={pixelId} 
            setPixelId={setPixelId} 
            pixelToken={pixelToken} 
            setPixelToken={setPixelToken} 
            isSavingMarketing={isSavingMarketing} 
            onSaveMarketing={() => {}} // Placeholder, logic can be added later
            onCopyAffiliateLink={() => {}} // Placeholder
            isCopyingLink={isCopyingLink} 
            onOpenTracking={() => {}} // Placeholder
          />
        }
        <GatewayCard 
            activeProvider={activeProviderName}
            onManage={() => navigate('/financial/providers')}
        />
      </main>
    </div>
  );
};
