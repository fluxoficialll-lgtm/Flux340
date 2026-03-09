
import React from 'react';
import { IconType } from 'react-icons';
import { FaChartPie, FaChartBar } from 'react-icons/fa6';
import { TbChartRadar } from 'react-icons/tb';

interface FiltroGraficosReceitaProps {
    onChartTypeChange: (type: string) => void;
    onDimensionChange: (dimension: string) => void;
    chartType: string;
    dimension: string;
}

const dimensionOptions = [
    { value: 'pais', label: 'País' },
    { value: 'metodo', label: 'Método de Pagamento' },
    { value: 'moeda', label: 'Moeda' },
    { value: 'provedor', label: 'Provedores' },
];

const chartTypeOptions: { value: string; label: string; icon: IconType }[] = [
    { value: 'pie', label: 'Pizza', icon: FaChartPie },
    { value: 'bar', label: 'Barras', icon: FaChartBar },
    { value: 'radar', label: 'Radar', icon: TbChartRadar },
];

export const FiltroGraficosReceita: React.FC<FiltroGraficosReceitaProps> = ({ onChartTypeChange, onDimensionChange, chartType, dimension }) => {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 col-span-1 md:col-span-3 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="col-span-1 md:col-span-2">
                    <label htmlFor="dimension-select" className="block text-sm font-medium text-white/70 mb-2">Analisar Receita Por</label>
                    <select
                        id="dimension-select"
                        value={dimension}
                        onChange={(e) => onDimensionChange(e.target.value)}
                        className="w-full bg-[#1a1f29] border border-white/20 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-[#00c2ff] shadow-sm"
                    >
                        {dimensionOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <div className="col-span-1">
                    <label className="block text-sm font-medium text-white/70 mb-2">Visualização</label>
                    <div className="flex bg-[#1a1f29] border border-white/20 rounded-md p-1 space-x-1">
                        {chartTypeOptions.map(option => {
                            const Icon = option.icon;
                            const isSelected = chartType === option.value;
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => onChartTypeChange(option.value)}
                                    className={`flex-1 flex justify-center items-center p-2 rounded-md transition-colors duration-200 ${isSelected ? 'bg-[#00c2ff] text-gray-900' : 'text-white/60 hover:bg-white/10'}`}
                                    title={option.label}
                                >
                                    <Icon size={18} />
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
