
import React, { Suspense, lazy } from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { Footer } from '../Componentes/layout/Footer';
import { FilterBar } from '../Componentes/ComponentesDeNotification/FilterBar';
import { NotificationCard } from '../Componentes/ComponentesDeNotification/NotificationCard';
import { MainHeader } from '../Componentes/layout/MainHeader';
import { ExpiringVipNotificationCard } from '../Componentes/ComponentesDeNotifications/Componentes/ExpiringVipNotificationCard';

const PaymentFlowModal = lazy(() => import('../Componentes/ComponentesDeProvedores/PaymentFlowModal').then(m => ({ default: m.PaymentFlowModal })));

export const Notifications: React.FC = () => {
  const {
    filter,
    setFilter,
    filteredNotifications,
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    selectedGroup,
    geoData,
    displayPriceInfo,
    handleFollowToggle,
    handlePendingAction,
    handleIgnoreExpiring,
    handlePayClick,
    navigate
  } = useNotifications();

  return (
    <div className="h-[100dvh] bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-hidden">
      
      <MainHeader />

      <FilterBar activeFilter={filter} onFilterChange={setFilter} />

      <main className="flex-grow flex flex-col items-center justify-start w-full mt-5 transition-all overflow-y-auto no-scrollbar">
        <div className="w-full max-w-[600px] px-4 pt-[140px] pb-[120px]">
            <h2 className="text-2xl font-700 mb-5 text-[#00c2ff] border-b-2 border-[#00c2ff]/30 pb-2">Notificações</h2>
            
            {filteredNotifications.length === 0 ? (
                <div style={{textAlign:'center', color:'#777', marginTop:'50px', display:'flex', flexDirection:'column', alignItems:'center', gap:'10px'}}>
                    <i className="fa-regular fa-bell-slash text-4xl opacity-50"></i>
                    <span>Nenhuma notificação encontrada.</span>
                </div>
            ) : (
                filteredNotifications.map(notif => {
                    if (notif.type === 'expiring_vip') {
                        return (
                            <ExpiringVipNotificationCard 
                                key={notif.id}
                                notif={notif}
                                onIgnore={handleIgnoreExpiring}
                                onPay={handlePayClick}
                            />
                        );
                    }
                    return (
                        <NotificationCard 
                            key={notif.id}
                            notif={notif}
                            onFollowToggle={handleFollowToggle}
                            onPendingAction={handlePendingAction}
                            onNavigate={navigate}
                        />
                    );
                })
            )}
        </div>
      </main>

      <Footer />

      <Suspense fallback={null}>
          {isPaymentModalOpen && selectedGroup && (
              <PaymentFlowModal 
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                group={selectedGroup}
                provider={geoData?.countryCode === 'BR' ? 'syncpay' : 'stripe'}
                convertedPriceInfo={displayPriceInfo}
                geo={geoData}
              />
          )}
      </Suspense>
    </div>
  );
};
