
import React, { Suspense, lazy } from 'react';
import { HookNotificacoes } from '../hooks/Hook.Notificacoes';
import { Footer } from '../Componentes/layout/Footer';
import { FilterBar } from '../Componentes/ComponentesDeNotification/FilterBar';
import { MainHeader } from '../Componentes/layout/MainHeader';
import { CardDesignSessaoNotificacao } from '../Componentes/ComponentesDeNotification/Card.Design.Sessao.Notificacao';
import { Notification } from '../tipos';

// A lógica de agrupamento, agora diretamente nesta página.
const getStartOfDay = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

interface GroupedNotifications { [key: string]: Notification[]; }

const groupNotificationsByDate = (notifications: Notification[]): GroupedNotifications => {
  const groups: GroupedNotifications = {};
  const now = new Date();
  const today = getStartOfDay(now);
  const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
  const oneWeekAgo = new Date(today); oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const oneMonthAgo = new Date(today); oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  notifications.forEach(notif => {
    const notifDate = new Date(notif.createdAt);
    const notifDay = getStartOfDay(notifDate);
    let groupKey: string;
    if (notifDay.getTime() === today.getTime()) groupKey = 'Hoje';
    else if (notifDay.getTime() === yesterday.getTime()) groupKey = 'Ontem';
    else if (notifDate >= oneWeekAgo) groupKey = 'Esta Semana';
    else if (notifDate >= oneMonthAgo) groupKey = 'Este Mês';
    else groupKey = notifDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });

    if (!groups[groupKey]) { groups[groupKey] = []; }
    groups[groupKey].push(notif);
  });
  return groups;
};

const notificationDateGroupsOrder = ['Hoje', 'Ontem', 'Esta Semana', 'Este Mês'];

const PaymentFlowModal = lazy(() => import('../Componentes/ComponentesDeProvedores/PaymentFlowModal').then(m => ({ default: m.PaymentFlowModal })));

export const Notifications: React.FC = () => {
  const {
    filter,
    setFilter,
    filteredNotifications,
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    selectedGroup,
    displayInfo,
    handleFollowToggle,
    handlePendingAction,
    handleIgnoreExpiring,
    handlePayClick,
    navigate
  } = HookNotificacoes();

  // 1. As notificações são agrupadas dinamicamente aqui.
  const groupedNotifications = groupNotificationsByDate(filteredNotifications);
  
  // 2. A ordem das seções é determinada aqui, incluindo seções mais antigas.
  const orderedGroupTitles = [
      ...notificationDateGroupsOrder,
      ...Object.keys(groupedNotifications).filter(key => !notificationDateGroupsOrder.includes(key))
  ];

  return (
    <div className="h-[100dvh] bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-hidden">
      <MainHeader />
      <FilterBar activeFilter={filter} onFilterChange={setFilter} />

      <main className="flex-grow flex flex-col items-center justify-start w-full transition-all overflow-y-auto no-scrollbar pt-[140px] pb-[120px]">
        <div className="w-full max-w-[600px] px-4">
            <h2 className="text-2xl font-bold mb-5 text-[#00c2ff] border-b-2 border-[#00c2ff]/30 pb-3">Notificações</h2>
            
            {filteredNotifications.length === 0 ? (
                <div style={{textAlign:'center', color:'#777', marginTop:'50px', display:'flex', flexDirection:'column', alignItems:'center', gap:'10px'}}>
                    <i className="fa-regular fa-bell-slash text-4xl opacity-50"></i>
                    <span>Nenhuma notificação encontrada.</span>
                </div>
            ) : (
                // 3. O loop agora usa os grupos reais e o componente de seção inteligente.
                orderedGroupTitles.map(title => (
                  <CardDesignSessaoNotificacao
                    key={title}
                    title={title}
                    notifications={groupedNotifications[title]}
                    onFollowToggle={handleFollowToggle}
                    onPendingAction={handlePendingAction}
                    onIgnoreExpiring={handleIgnoreExpiring}
                    onPay={handlePayClick}
                    navigate={navigate}
                  />
                ))
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
                provider={'stripe'}
                convertedPriceInfo={displayInfo}
                geo={null}
              />
          )}
      </Suspense>
    </div>
  );
};
