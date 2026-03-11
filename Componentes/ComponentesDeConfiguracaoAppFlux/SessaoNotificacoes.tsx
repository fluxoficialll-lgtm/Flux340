
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ItemConfiguracao } from './ItemConfiguracao';

export const SessaoNotificacoes: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="settings-group">
            <h2>Configurações de Notificações</h2>
            <ItemConfiguracao 
                icon="fa-bell" 
                label="Configurações de Notificação" 
                onClick={() => navigate('/pg-configuracao-notificacao')} 
            />
        </div>
    );
};
