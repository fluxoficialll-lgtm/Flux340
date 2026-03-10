
import React from 'react';

export const CardParametrosMetaADS: React.FC = () => {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-6">
            <h3 className="font-bold text-lg text-white/90 mb-4">Parâmetros do Meta ADS</h3>
            <p className="text-sm text-white/50 mb-6">Defina os parâmetros de URL (UTM) para rastrear a origem do tráfego gerado pelas suas campanhas no Meta Ads.</p>

            <div className="space-y-4">
                {/* UTM Source */}
                <div>
                    <label htmlFor="utm_source" className="block text-sm font-medium text-white/70 mb-2">utm_source</label>
                    <input
                        type="text"
                        id="utm_source"
                        defaultValue="meta"
                        readOnly
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white/50 cursor-not-allowed"
                    />
                </div>

                {/* UTM Medium */}
                <div>
                    <label htmlFor="utm_medium" className="block text-sm font-medium text-white/70 mb-2">utm_medium</label>
                    <input
                        type="text"
                        id="utm_medium"
                        placeholder="Ex: cpc, social, stories"
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                </div>

                {/* UTM Campaign */}
                <div>
                    <label htmlFor="utm_campaign" className="block text-sm font-medium text-white/70 mb-2">utm_campaign</label>
                    <input
                        type="text"
                        id="utm_campaign"
                        placeholder="Ex: lancamento_produto_x"
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    Salvar Parâmetros
                </button>
            </div>
        </div>
    );
};
