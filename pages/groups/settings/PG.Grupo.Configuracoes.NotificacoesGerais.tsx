
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGroupSettings } from '../../../Componentes/ComponentesDeGroups/hooks/useGroupSettings';

export const PGGrupoConfiguracoesNotificacoesGerais: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { group, loading } = useGroupSettings();

    if (loading || !group || !id) {
        return (
            <div className="min-h-screen bg-[#0c0f14] flex items-center justify-center text-white">
                <i className="fa-solid fa-circle-notch fa-spin text-2xl text-[#00c2ff]"></i>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-hidden">
            <header className="flex items-center p-4 bg-[#0c0f14] fixed w-full top-0 z-40 border-b border-white/10 h-[65px]">
                <button onClick={() => window.history.back()} className="bg-none border-none text-white text-2xl cursor-pointer pr-4">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h1 className="font-bold text-lg text-white">Notificações Gerais</h1>
            </header>

            <main className="pt-[85px] pb-[100px] w-full max-w-2xl mx-auto px-5 overflow-y-auto flex-grow no-scrollbar">
                <div className="space-y-8">
                   {/* Conteúdo da página de configurações de notificações gerais */}
                </div>
            </main>
        </div>
    );
};
