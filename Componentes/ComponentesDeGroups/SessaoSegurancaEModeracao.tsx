
import React from 'react';
import { ItemConfiguracao } from '../ComponentesDeConfiguracaoAppFlux/ItemConfiguracao';

const NewBadge = () => (
    <span className="bg-[#00c2ff] text-black text-[9px] font-black px-2 py-0.5 rounded-full ml-3 shadow-[0_0_10px_rgba(0,194,255,0.3)]">
        NEW
    </span>
);

interface SessaoSegurancaEModeracaoProps {
    navigate: (path: string) => void;
    id: string;
}

export const SessaoSegurancaEModeracao: React.FC<SessaoSegurancaEModeracaoProps> = ({ navigate, id }) => {
    return (
        <div className="settings-group">
            <h2>Segurança e Moderação</h2>
            <ItemConfiguracao
                icon="fa-id-card-clip"
                label="Gestão de Cargos"
                onClick={() => navigate(`/group-settings/${id}/roles`)}
                rightElement={<div className="flex items-center"><NewBadge /><i className="fas fa-chevron-right text-gray-600 text-xs ml-3"></i></div>}
            />
            <ItemConfiguracao
                icon="fa-key"
                label="Acesso e Convites"
                onClick={() => navigate(`/group-settings/${id}/access`)}
            />
            <ItemConfiguracao
                icon="fa-sliders"
                label="Regras de Chat"
                onClick={() => navigate(`/group-settings/${id}/moderation`)}
            />
            <ItemConfiguracao
                icon="fa-users"
                label="Lista de Membros"
                onClick={() => navigate(`/group-settings/${id}/members`)}
            />
        </div>
    );
};
