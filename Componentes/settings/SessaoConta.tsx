
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ItemConfiguracao } from './ItemConfiguracao';

export const SessaoConta: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="settings-group">
            <h2>Conta</h2>
            <ItemConfiguracao 
                icon="fa-user-edit" 
                label="Editar Perfil" 
                onClick={() => navigate('/edit-profile')} 
            />
            <ItemConfiguracao 
                icon="fa-wallet" 
                label="Resgatar Saldo (Financeiro)" 
                onClick={() => navigate('/financial')} 
            />
        </div>
    );
};
