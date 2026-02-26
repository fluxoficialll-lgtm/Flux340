import React from 'react';

interface ProfileTabNavProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    hasProducts: boolean;
}

export const NavegacaoPorAbasDoPerfil: React.FC<ProfileTabNavProps> = ({ activeTab, setActiveTab, hasProducts }) => {
    const tabs = [
        { id: 'posts', label: 'Posts' },
        { id: 'fotos', label: 'Fotos' },
        { id: 'reels', label: 'Reels' },
    ];

    if (hasProducts) {
        tabs.splice(1, 0, { id: 'products', label: 'Produtos' });
    }

    return (
        <nav className="tabs-nav flex justify-around bg-gray-900 p-2 rounded-t-lg">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`px-4 py-2 font-semibold rounded-lg ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
                    onClick={() => setActiveTab(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </nav>
    );
};
