
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CabecalhoConfiguracaoInformacao } from '../../../Componentes/cabeçalhos/Cabecalho.Configuracao.Informacao';

export const PGGrupoConfiguracoesEditarPaginaDeVendas: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col">
            <CabecalhoConfiguracaoInformacao titulo="Editar Página de Vendas" onBack={() => navigate(-1)} />

            <main className="pt-[85px] pb-[40px] w-full max-w-4xl mx-auto px-5 overflow-y-auto flex-grow no-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Coluna de Edição */}
                    <div className="bg-black/20 border border-white/10 rounded-xl p-6">
                        <h2 className="text-xl font-bold mb-4">Componentes</h2>
                        {/* Adicione os componentes de edição aqui */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Título</label>
                                <input type="text" className="w-full bg-black/30 border border-white/20 rounded-lg p-2" placeholder="Título da Página" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Descrição</label>
                                <textarea className="w-full bg-black/30 border border-white/20 rounded-lg p-2 h-32" placeholder="Descrição da Página"></textarea>
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Salvar</button>
                        </div>
                    </div>

                    {/* Coluna de Preview */}
                    <div className="bg-black/20 border border-white/10 rounded-xl p-6">
                        <h2 className="text-xl font-bold mb-4">Preview</h2>
                        <div className="w-full h-96 bg-white/10 rounded-lg flex items-center justify-center">
                            <span className="text-gray-400">Preview da Página de Vendas</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
