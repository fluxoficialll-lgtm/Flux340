
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CabecalhoConfiguracaoInformacao } from '../../../Componentes/cabeçalhos/Cabecalho.Configuracao.Informacao';
import CardDistribuicaoCargos from '../../../Componentes/ComponentesDeGroups/Componentes/ComponentesDeConfiguracoesDeGrupo/Card.Distribuicao.Cargos';
import { GroupRole } from '../../../tipos/types.Grupo';

// Tipagem para um membro (deve corresponder à do card)
interface Member {
    id: string;
    name: string;
    avatarUrl?: string;
    roleId: string | null;
}

// -- Mock Data Atualizada --
const mockMembers: Member[] = [
    { id: '1', name: 'Alice de Sousa', roleId: 'dev', avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: '2', name: 'Bruno Martins', roleId: 'vip', avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { id: '3', name: 'Carla Dias', roleId: 'mod', avatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { id: '4', name: 'David Teixeira', roleId: null, avatarUrl: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { id: '5', name: 'Helena Costa', roleId: 'vip', avatarUrl: 'https://randomuser.me/api/portraits/women/5.jpg' },
];

// Usando a tipagem GroupRole completa
const mockRoles: GroupRole[] = [
    {
        id: 'dev',
        name: 'Desenvolvedor',
        color: '#00c2ff',
        priority: 100,
        permissions: { isAdmin: true, canManageRoles: true } as any, // Simplificado
    },
    {
        id: 'mod',
        name: 'Moderador',
        color: '#22c55e',
        priority: 50,
        permissions: { canKickMembers: true, canDeleteMessages: true } as any,
    },
    {
        id: 'vip',
        name: '💎 VIP Member',
        color: '#be185d',
        priority: 20,
        permissions: { canBypassSlowMode: true } as any,
    },
];

// --- Página Principal ---
export const PGGrupoConfiguracoesDistribuiçaoDeCargos: React.FC = () => {
    const navigate = useNavigate();
    const [members, setMembers] = useState<Member[]>(mockMembers);

    const handleUpdateMemberRole = (memberId: string, roleId: string | null) => {
        setMembers(prevMembers =>
            prevMembers.map(member =>
                member.id === memberId ? { ...member, roleId: roleId } : member
            )
        );
    };

    const handleSaveChanges = () => {
        console.log('Salvando distribuição de cargos:', members);
        // Aqui você faria a chamada à API para salvar os dados
        alert('Distribuição de cargos salva com sucesso! (Simulação)');
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col">
            <CabecalhoConfiguracaoInformacao titulo="Distribuição de Cargos" onBack={() => navigate(-1)} />

            <main className="pt-[85px] pb-[120px] w-full max-w-2xl mx-auto px-5 overflow-y-auto flex-grow no-scrollbar">
                {/* O novo card substitui a lista antiga */}
                <CardDistribuicaoCargos 
                    members={members}
                    roles={mockRoles}
                    onUpdateMemberRole={handleUpdateMemberRole}
                />
            </main>

            <footer className="fixed bottom-0 left-0 right-0 bg-[#0c0f14]/80 backdrop-blur-sm z-30">
                <div className="max-w-2xl mx-auto p-4">
                    <button
                        onClick={handleSaveChanges}
                        className="w-full bg-[#00c2ff] text-black font-bold py-3.5 px-4 rounded-xl hover:bg-white transition-all duration-300 shadow-[0_4px_20px_rgba(0,194,255,0.4)]"
                    >
                        Salvar Alterações
                    </button>
                </div>
            </footer>
        </div>
    );
};
