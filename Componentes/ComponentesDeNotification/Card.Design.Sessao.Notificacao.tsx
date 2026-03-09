
import React from 'react';
import { Notification } from '../../tipos';
import { NotificationCard } from './NotificationCard';
import { ExpiringVipNotificationCard } from '../ComponentesDeNotifications/Componentes/ExpiringVipNotificationCard';

interface CardDesignSessaoProps {
  title: string;
  notifications: Notification[];
  onFollowToggle: (id: number, username: string) => void;
  onPendingAction: (action: 'accept' | 'reject', notification: any) => void;
  onIgnoreExpiring: (id: number) => void;
  onPay: (groupId: string) => void;
  navigate: (path: string) => void;
}

/**
 * Componente autônomo que renderiza uma seção de notificações com um design
 * sofisticado, replicando o padrão visual da página de Configurações.
 * Cada card de notificação é tratado como um item individual e elegante.
 */
export const CardDesignSessaoNotificacao: React.FC<CardDesignSessaoProps> = ({
  title,
  notifications,
  ...props
}) => {
  if (!notifications || notifications.length === 0) {
    return null;
  }

  return (
    <>
      {/* CSS que replica o estilo da página de Configurações. */}
      <style>{`
        .notification-section { margin-bottom: 20px; }
        .notification-section h2 {
          font-size: 13px; color: #00c2ff; padding: 10px 0; 
          margin-bottom: 8px; text-transform: uppercase; 
          font-weight: 800; letter-spacing: 1px;
        }

        /* Estilo aplicado a cada card individual para parecer um 'setting-item' */
        .notification-section .notification-item,
        .notification-section .notification-item-vip {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          padding: 16px !important;
          background-color: rgba(255, 255, 255, 0.03) !important;
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
          transition: background-color 0.2s, border-color 0.2s !important;
          border-radius: 14px !important;
          margin-bottom: 8px !important;
          border-bottom: none !important; /* Remove a linha separadora antiga */
          border-left: none !important; /* Remove a borda colorida antiga */
        }

        /* Remove a margem inferior do último item para alinhamento perfeito */
        .notification-section > .notification-cards-wrapper > div:last-child > .notification-item,
        .notification-section > .notification-cards-wrapper > div:last-child > .notification-item-vip {
            margin-bottom: 0 !important;
        }

        /* Efeito de hover consistente com a página de Configurações */
        .notification-section .notification-item:hover,
        .notification-section .notification-item-vip:hover {
          background-color: rgba(255, 255, 255, 0.06) !important;
          border-color: rgba(0, 194, 255, 0.2) !important;
        }

        /* Mantém um diferencial sutil para tipos especiais, mas dentro do novo design */
        .notification-section .notification-sale { background-color: rgba(0, 255, 130, 0.06) !important; }
        .notification-section .notification-pending { background-color: rgba(255, 170, 0, 0.06) !important; }
        .notification-section .notification-item-vip { background: rgba(255, 215, 0, 0.06) !important; }
      `}</style>

      <section className="notification-section">
        <h2>{title}</h2>
        <div className="notification-cards-wrapper">
          {notifications.map(notif => (
            // A key é essencial para o React identificar cada elemento na lista
            <div key={notif.id}>
              {notif.type === 'expiring_vip' ? (
                <ExpiringVipNotificationCard
                  notif={notif}
                  onIgnore={props.onIgnoreExpiring}
                  onPay={props.onPay}
                />
              ) : (
                <NotificationCard
                  notif={notif}
                  onFollowToggle={props.onFollowToggle}
                  onPendingAction={props.onPendingAction}
                  onNavigate={props.navigate}
                />
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
