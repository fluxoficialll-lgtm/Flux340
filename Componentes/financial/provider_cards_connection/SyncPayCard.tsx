
import React, { useState } from 'react';
import { ProviderCredentialsModal } from '../ProviderCredentialsModal';

export const SyncPayCard = ({ group, activeProviderId, onCredentialsSubmit, onDisconnect, onSelectProvider }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isConnected = group?.paymentConfig?.syncpay?.isConnected;

    const handleConnectClick = () => {
        setIsModalOpen(true);
    };

    const handleDisconnectClick = (e) => {
        e.stopPropagation();
        onDisconnect('syncpay');
    };

    const handleUpdateClick = (e) => {
        e.stopPropagation();
        setIsModalOpen(true);
    };

    const handleCardClick = () => {
        if (isConnected) {
            onSelectProvider('syncpay');
        }
    };

    return (
        <>
            <div className={`provider-card ${isConnected ? 'clickable' : ''}`} onClick={handleCardClick}>
                <div className="provider-icon"><i className="fa-solid fa-bolt"></i></div>
                <div className="provider-name">SyncPay</div>
                {activeProviderId === 'syncpay' && <div className="active-indicator">Ativo</div>}

                <div className="provider-card-buttons">
                    {!isConnected ? (
                        <button onClick={handleConnectClick} className="connect-button">Conectar</button>
                    ) : (
                        <>
                            <button onClick={handleUpdateClick} className="update-button">Atualizar</button>
                            <button onClick={handleDisconnectClick} className="disconnect-button">Desconectar</button>
                        </>
                    )}
                </div>
            </div>

            <ProviderCredentialsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                providerId="syncpay"
                providerName="SyncPay"
                onConnect={(credentials) => onCredentialsSubmit('syncpay', credentials)}
                onDisconnect={() => onDisconnect('syncpay')}
                existingConfig={group?.paymentConfig?.syncpay}
            />
        </>
    );
};
