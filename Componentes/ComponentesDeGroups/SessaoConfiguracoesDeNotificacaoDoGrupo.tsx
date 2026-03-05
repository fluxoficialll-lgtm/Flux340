
import React from 'react';
import { ItemConfiguracao } from '../ComponentesDeConfiguracaoAppFlux/ItemConfiguracao';

interface SessaoConfiguracoesDeNotificacaoDoGrupoProps {
    navigate: (path: string) => void;
    id: string;
}

export const SessaoConfiguracoesDeNotificacaoDoGrupo: React.FC<SessaoConfiguracoesDeNotificacaoDoGrupoProps> = ({ navigate, id }) => {
    return (
        <div className="settings-group">
            <h2>Configurações de Notificação do Grupo</h2>
            <ItemConfiguracao
                icon="fa-bell"
                label="Notificações Gerais"
                onClick={() => navigate(`/group-settings/${id}/general-notifications`)}
            />
        </div>
    );
};
