
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGroupSettings } from '../Componentes/ComponentesDeGroups/hooks/useGroupSettings';
import { SessaoEstruturaEIdentidade } from '../Componentes/ComponentesDeGroups/SessaoEstruturaEIdentidade';
import { SessaoSegurancaEModeracao } from '../Componentes/ComponentesDeGroups/SessaoSegurancaEModeracao';
import { SessaoMonetizacaoEEscala } from '../Componentes/ComponentesDeGroups/SessaoMonetizacaoEEscala';
import { SessaoZonaCritica } from '../Componentes/ComponentesDeGroups/SessaoZonaCritica';

export const GroupSettings: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { group, loading, isOwner } = useGroupSettings();

    if (loading || !group || !id) {
        return (
            <div className="min-h-screen bg-[#0c0f14] flex items-center justify-center text-white">
                <i className="fa-solid fa-circle-notch fa-spin text-2xl text-[#00c2ff]"></i>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-hidden">
            <style>{`
                .settings-group{margin-bottom:20px;}
                .settings-group h2{font-size:13px;color:#00c2ff;padding:10px 0;margin-bottom:8px;text-transform:uppercase;font-weight:800;letter-spacing:1px;}
                .setting-item{display:flex;align-items:center;justify-content:space-between;padding:16px;background-color:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);transition:0.2s;color:#fff;cursor:pointer;border-radius:14px;margin-bottom:8px;}
                .setting-item:hover{background-color:rgba(255,255,255,0.06);border-color:rgba(0,194,255,0.2);}
                .setting-info{display:flex;align-items:center;}
                .setting-info i{font-size:18px;width:30px;text-align:center;margin-right:12px;color:#00c2ff;}
                .setting-item p{font-size:15px;font-weight:500;}
            `}</style>

            <header className="flex items-center p-4 bg-[#0c0f14] fixed w-full top-0 z-40 border-b border-white/10 h-[65px]">
                <button onClick={() => navigate(-1)} className="bg-none border-none text-white text-2xl cursor-pointer pr-4">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h1 className="font-bold text-lg text-white">Gestão da Comunidade</h1>
            </header>

            <main className="pt-[85px] pb-[100px] w-full max-w-2xl mx-auto px-5 overflow-y-auto flex-grow no-scrollbar">
                <SessaoEstruturaEIdentidade navigate={navigate} id={id} isSalesPlatformEnabled={group.isSalesPlatformEnabled} />
                <SessaoSegurancaEModeracao navigate={navigate} id={id} />
                <SessaoMonetizacaoEEscala navigate={navigate} id={id} group={group} isOwner={isOwner} />
                <SessaoZonaCritica handleLeaveDelete={() => {}} isOwner={isOwner} />

                <div className="text-center mt-8 opacity-20 text-[9px] uppercase font-black tracking-[3px]">
                    Flux Community Engine • {id}
                </div>
            </main>
        </div>
    );
};
