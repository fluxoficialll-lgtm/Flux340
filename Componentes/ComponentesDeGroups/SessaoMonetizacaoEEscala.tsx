
import React from 'react';
import { ItemConfiguracao } from '../ComponentesDeConfiguracaoAppFlux/ItemConfiguracao';
import { Group } from '../../types';

const NewBadge = () => (
    <span className="bg-[#00c2ff] text-black text-[9px] font-black px-2 py-0.5 rounded-full ml-3 shadow-[0_0_10px_rgba(0,194,255,0.3)]">
        NEW
    </span>
);

interface SessaoMonetizacaoEEscalaProps {
    navigate: (path: string) => void;
    id: string;
    group: Group;
    isOwner: boolean;
}

export const SessaoMonetizacaoEEscala: React.FC<SessaoMonetizacaoEEscalaProps> = ({ navigate, id, group, isOwner }) => {
    return (
        <div className="settings-group">
            <h2>Monetização e Escala</h2>
            <ItemConfiguracao
                icon="fa-cash-register"
                label="Configurações de Checkout"
                onClick={() => navigate(`/group-settings/${id}/checkout-config`)}
                rightElement={<div className="flex items-center"><NewBadge /><i className="fas fa-chevron-right text-gray-600 text-xs ml-3"></i></div>}
            />
            <ItemConfiguracao
                icon="fa-chart-pie"
                label="Faturamento Detalhado"
                onClick={() => navigate(`/group-revenue/${id}`)}
            />
            <ItemConfiguracao
                icon="fa-calendar-check"
                label="Mensagens Agendadas"
                onClick={() => navigate(`/group-settings/${id}/schedule`)}
            />
            {group.isVip && isOwner && (
                <ItemConfiguracao
                    icon="fa-crown"
                    label="Funil de Vendas VIP"
                    onClick={() => navigate(`/group-settings/${id}/vip`)}
                    rightElement={<div className="flex items-center"><i className="fa-solid fa-star text-[#FFD700] text-sm"></i><i className="fas fa-chevron-right text-gray-600 text-xs ml-3"></i></div>}
                />
            )}
        </div>
    );
};
