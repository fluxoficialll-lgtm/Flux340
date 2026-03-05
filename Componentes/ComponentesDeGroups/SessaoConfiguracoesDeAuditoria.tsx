
import React from 'react';
import { ItemConfiguracao } from '../ComponentesDeConfiguracaoAppFlux/ItemConfiguracao';

interface SessaoConfiguracoesDeAuditoriaProps {
    navigate: (path: string) => void;
    id: string;
}

export const SessaoConfiguracoesDeAuditoria: React.FC<SessaoConfiguracoesDeAuditoriaProps> = ({ navigate, id }) => {
    return (
        <div className="settings-group">
            <h2>Configurações de Auditoria</h2>
            <ItemConfiguracao
                icon="fa-file-contract"
                label="Logs de Auditoria"
                onClick={() => {}}
            />
        </div>
    );
};
