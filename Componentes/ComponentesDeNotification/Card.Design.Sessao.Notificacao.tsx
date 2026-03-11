
import React from 'react';
import { Notification } from '../../tipos';
import { ExpiringVipNotificationCard } from '../ComponentesDeNotifications/Componentes/ExpiringVipNotificationCard';
import { CardNotificacaoCurtidas } from './cards/Card.Notificacao.Curtidas';
import { CardNotificacaoComentario } from './cards/Card.Notificacao.Comentario';
import { CardNotificacaoSeguidor } from './cards/Card.Notificacao.Seguidor';
import { CardNotificacaoVendaRealizada } from './cards/Card.Notificacao.Venda.Realizada';
import { CardNotificacaoVendaPendente } from './cards/Card.Notificacao.Venda.Pendente'; 
import { CardNotificacaoCobranca } from './cards/Card.Notificacao.Cobranca';
import { CardNotificacaoMencao } from './cards/Card.Notificacao.Mencao';
import { CardNotificacaoCompartilhamento } from './cards/Card.Notificacao.Compartilhamento';
import { CardNotificacaoComentarioResposta } from './cards/Card.Notificacao.Comentario.Resposta';
import { CardNotificacaoPedidoAmizade } from './cards/Card.Notificacao.Pedido.Amizade';
import { CardNotificacaoConviteGrupo } from './cards/Card.Notificacao.Convite.Grupo';
import { CardNotificacaoLogin } from './cards/Card.Notificacao.Login';
import { CardNotificacaoCompraSucesso } from './cards/Card.Notificacao.Compra.Sucesso';

interface CardDesignSessaoProps {
  title: string;
  notifications: Notification[];
  onFollowToggle: (id: number, username: string) => void;
  onPendingAction: (action: 'accept' | 'reject', notification: any) => void;
  onIgnoreExpiring: (id: number) => void;
  onPay: (groupId: string) => void;
  navigate: (path: string) => void;
}

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
      <style>{`
        .notification-section { margin-bottom: 20px; }
        .notification-section h2 {
          font-size: 13px; color: #00c2ff; padding: 10px 0; 
          margin-bottom: 8px; text-transform: uppercase; 
          font-weight: 800; letter-spacing: 1px;
        }
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
          border-bottom: none !important;
          border-left: none !important;
        }
        .notification-section > .notification-cards-wrapper > div:last-child > .notification-item,
        .notification-section > .notification-cards-wrapper > div:last-child > .notification-item-vip {
            margin-bottom: 0 !important;
        }
        .notification-section .notification-item:hover,
        .notification-section .notification-item-vip:hover {
          background-color: rgba(255, 255, 255, 0.06) !important;
          border-color: rgba(0, 194, 255, 0.2) !important;
        }
        .notification-section .notification-sale { background-color: rgba(0, 255, 130, 0.06) !important; }
        .notification-section .notification-pending { background-color: rgba(255, 170, 0, 0.06) !important; }
        .notification-section .notification-item-vip { background: rgba(255, 215, 0, 0.06) !important; }
      `}</style>

      <section className="notification-section">
        <h2>{title}</h2>
        <div className="notification-cards-wrapper">
          {notifications.map(notif => (
            <div key={notif.id}>
              {notif.type === 'like' ? (
                <CardNotificacaoCurtidas notif={notif} />
              ) : notif.type === 'comment' ? (
                <CardNotificacaoComentario notif={notif} />
              ) : notif.type === 'comment_reply' ? (
                <CardNotificacaoComentarioResposta notif={notif} navigate={props.navigate} />
              ) : notif.type === 'follow' ? (
                <CardNotificacaoSeguidor notif={notif} onFollowToggle={props.onFollowToggle} />
              ) : notif.type === 'friend_request' ? (
                <CardNotificacaoPedidoAmizade
                  notif={notif}
                  onAccept={(id, username) => props.onPendingAction('accept', notif)}
                  onDecline={(id, username) => props.onPendingAction('reject', notif)}
                />
              ) : notif.type === 'group_invite' ? (
                <CardNotificacaoConviteGrupo
                  notif={notif}
                  onAccept={(notificationId, groupId) => props.onPendingAction('accept', notif)}
                  onDecline={(notificationId, groupId) => props.onPendingAction('reject', notif)}
                />
               ) : notif.type === 'login' ? (
                <CardNotificacaoLogin notif={notif} />
              ) : notif.type === 'venda_realizada' ? (
                <CardNotificacaoVendaRealizada notif={notif} />
              ) : notif.type === 'compra_sucesso' ? (
                <CardNotificacaoCompraSucesso notif={notif} />
              ) : notif.type === 'venda_pendente' ? (
                <CardNotificacaoVendaPendente notif={notif} />
              ) : notif.type === 'cobranca' ? (
                <CardNotificacaoCobranca notif={notif} onPay={props.onPay} />
              ) : notif.type === 'mention' ? (
                <CardNotificacaoMencao notif={notif} navigate={props.navigate} />
              ) : notif.type === 'compartilhamento' ? (
                <CardNotificacaoCompartilhamento notif={notif} navigate={props.navigate} />
              ) : notif.type === 'expiring_vip' ? (
                <ExpiringVipNotificationCard
                  notif={notif}
                  onIgnore={props.onIgnoreExpiring}
                  onPay={props.onPay}
                />
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
