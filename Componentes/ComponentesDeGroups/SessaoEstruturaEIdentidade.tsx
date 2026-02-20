
import React from 'react';
import { ItemConfiguracao } from '../ComponentesDeConfiguracaoAppFlux/ItemConfiguracao';

const ActiveBadge = () => (
    <div className="flex items-center gap-1.5 bg-[#00ff821a] border border-[#00ff8233] px-2 py-0.5 rounded-lg ml-3">
        <div className="w-1.5 h-1.5 rounded-full bg-[#00ff82] shadow-[0_0_5px_#00ff82]"></div>
        <span className="text-[#00ff82] text-[8px] font-black uppercase">Ativo</span>
    </div>
);

interface SessaoEstruturaEIdentidadeProps {
    navigate: (path: string) => void;
    id: string;
    isSalesPlatformEnabled: boolean;
}

export const SessaoEstruturaEIdentidade: React.FC<SessaoEstruturaEIdentidadeProps> = ({ navigate, id, isSalesPlatformEnabled }) => {
    return (
        <div className="settings-group">
            <h2>Estrutura e Identidade</h2>
            <ItemConfiguracao
                icon="fa-circle-info"
                label="Informações Principais"
                onClick={() => navigate(`/group-settings/${id}/info`)}
            />
            <ItemConfiguracao
                icon="fa-chart-simple"
                label="Estatísticas de Capacidade"
                onClick={() => navigate(`/group-settings/${id}/stats`)}
            />
            <ItemConfiguracao
                icon="fa-cubes-stacked"
                label="Modo Hub (Conteúdo e Chat)"
                onClick={() => navigate(`/group-settings/${id}/sales-platform`)}
                rightElement={
                    <div className="flex items-center">
                        {isSalesPlatformEnabled && <ActiveBadge />}
                        <i className="fas fa-chevron-right text-gray-600 text-xs ml-3"></i>
                    </div>
                }
            />
        </div>
    );
};
