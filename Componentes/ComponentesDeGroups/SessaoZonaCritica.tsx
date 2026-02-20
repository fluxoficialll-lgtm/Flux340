
import React from 'react';

interface SessaoZonaCriticaProps {
    handleLeaveDelete: (action: 'leave' | 'delete') => void;
    isOwner: boolean;
}

export const SessaoZonaCritica: React.FC<SessaoZonaCriticaProps> = ({ handleLeaveDelete, isOwner }) => {
    return (
        <div className="logout-container">
            <h2 className="text-[11px] font-black text-red-500/50 uppercase tracking-[2px] mb-4 pl-1">Zona Crítica</h2>
            <button onClick={() => handleLeaveDelete('leave')} className="danger-btn">
                <i className="fa-solid fa-right-from-bracket"></i> Sair do Grupo
            </button>
            {isOwner && (
                <button onClick={() => handleLeaveDelete('delete')} className="danger-btn" style={{ background: 'rgba(255, 77, 77, 0.1)', borderColor: 'rgba(255, 77, 77, 0.3)' }}>
                    <i className="fa-solid fa-trash-can"></i> Excluir Permanentemente
                </button>
            )}
        </div>
    );
};
