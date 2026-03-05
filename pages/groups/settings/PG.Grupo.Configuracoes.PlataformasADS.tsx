
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CabecalhoConfiguracaoInformacao } from '../../../Componentes/cabeçalhos/Cabecalho.Configuracao.Informacao';

export const PGGrupoConfiguracoesPlataformasADS: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [pixelId, setPixelId] = useState('');
    const [analyticsId, setAnalyticsId] = useState('');

    const handleSave = () => {
        // Lógica para salvar os IDs
        console.log('Pixel ID:', pixelId);
        console.log('Analytics ID:', analyticsId);
        alert('Configurações salvas!');
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col">
            <CabecalhoConfiguracaoInformacao titulo="Plataformas ADS" onBack={() => navigate(-1)} />

            <main className="pt-[85px] pb-[40px] w-full max-w-2xl mx-auto px-5 overflow-y-auto flex-grow no-scrollbar">
                <div className="space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Facebook Pixel</h2>
                        <input
                            type="text"
                            value={pixelId}
                            onChange={(e) => setPixelId(e.target.value)}
                            placeholder="Seu ID do Pixel"
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Google Analytics</h2>
                        <input
                            type="text"
                            value={analyticsId}
                            onChange={(e) => setAnalyticsId(e.target.value)}
                            placeholder="Seu ID do Google Analytics"
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
                    >
                        Salvar
                    </button>
                </div>
            </main>
        </div>
    );
};
