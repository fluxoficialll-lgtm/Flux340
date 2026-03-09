
import React from 'react';
import { ItemConfiguracao } from '../ComponentesDeConfiguracaoAppFlux/ItemConfiguracao';

interface SessaoConfiguracoesFinanceirasProps {
    navigate: (path: string) => void;
    id: string;
}

export const SessaoConfiguracoesFinanceiras: React.FC<SessaoConfiguracoesFinanceirasProps> = ({ navigate, id }) => {
    return (
        <div className="settings-group">
            <h2>Configurações Financeiras</h2>
            <ItemConfiguracao
                icon="fa-chart-pie"
                label="Faturamento Detalhado"
                onClick={() => navigate(`/group/${id}/revenue`)}
            />
        </div>
    );
};
