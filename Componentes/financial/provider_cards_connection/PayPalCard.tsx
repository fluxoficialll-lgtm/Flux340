
import React, { useState } from 'react';
import { ProviderCredentialsModal } from '../ProviderCredentialsModal';

export const PayPalCard = ({ group, activeProviderId, onCredentialsSubmit, onDisconnect, onSelectProvider }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isConnected = group?.paymentConfig?.paypal?.isConnected;

    const handleConnectClick = () => {
        setIsModalOpen(true);
    };

    const handleDisconnectClick = (e) => {
        e.stopPropagation();
        onDisconnect('paypal');
    };

    const handleUpdateClick = (e) => {
        e.stopPropagation();
        setIsModalOpen(true);
    };

    const handleCardClick = () => {
        if (isConnected) {
            onSelectProvider('paypal');
        }
    };

    return (
        <>
            <div className={`provider-card ${isConnected ? 'clickable' : ''}`} onClick={handleCardClick}>
                <div className="provider-icon"><i className="fa-brands fa-paypal"></i></div>
                <div className="provider-name">PayPal</div>
                {activeProviderId === 'paypal' && <div className="active-indicator">Ativo</div>}

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
                providerId="paypal"
                providerName="PayPal"
                onConnect={(credentials) => onCredentialsSubmit('paypal', credentials)}
                onDisconnect={() => onDisconnect('paypal')}
                existingConfig={group?.paymentConfig?.paypal}
            />
        </>
    );
};
