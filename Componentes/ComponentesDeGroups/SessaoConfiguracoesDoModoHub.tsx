
import React from 'react';
import { ItemConfiguracao } from '../ComponentesDeConfiguracaoAppFlux/ItemConfiguracao';

interface SessaoConfiguracoesDoModoHubProps {
    id: string;
    isSalesPlatformEnabled: boolean;
    onToggleSalesPlatform: () => void;
}

export const SessaoConfiguracoesDoModoHub: React.FC<SessaoConfiguracoesDoModoHubProps> = ({ id, isSalesPlatformEnabled, onToggleSalesPlatform }) => {
    return (
        <div className="settings-group">
            <h2>Configurações do Modo Hub</h2>
            <ItemConfiguracao
                icon="fa-cubes-stacked"
                label="Modo Hub (Conteúdo e Chat)"
                onClick={onToggleSalesPlatform}
                rightElement={
                    <label className="switch">
                        <input type="checkbox" checked={isSalesPlatformEnabled} onChange={() => {}} />
                        <span className="slider-switch"></span>
                    </label>
                }
            />
        </div>
    );
};
