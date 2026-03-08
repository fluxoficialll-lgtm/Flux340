
import React, { useState } from 'react';
import { GroupRolePermissions } from '../../../../../tipos/types.Grupo';
import { ModalPermissoes } from './Modal.Permissoes';

// Estado inicial para as permissões do cargo padrão
const initialPermissions: GroupRolePermissions = {
    isAdmin: false,
    canEditGroupInfo: false,
    canManageRoles: false,
    canViewAuditLogs: false,
    canViewRevenue: false,
    canSendMessages: true,
    canDeleteMessages: false,
    canPinMessages: false,
    canBypassSlowMode: false,
    canKickMembers: false,
    canBanMembers: false,
    canApproveMembers: false,
    canInviteMembers: true,
    canManageFolders: false,
    canManageFiles: false,
    canPostScheduled: false,
    canManageAds: false,
    canToggleSlowMode: false,
    canSetSlowModeInterval: false,
    canCreateSubgroups: false,
    canManagePolls: false,
    canManageNotifications: false,
    canMentionEveryone: false,
};

// Componente Principal do Card
const CardCargoPadrao: React.FC = () => {
    const [permissions, setPermissions] = useState<GroupRolePermissions>(initialPermissions);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const updatePermission = (key: keyof GroupRolePermissions) => {
        setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <>
            <div className="bg-black/20 border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-center">
                    <div className="flex-grow pr-4">
                        <h3 className="text-lg font-bold text-white">Cargo Padrão de Entrada</h3>
                        <p className="text-gray-400 text-sm mt-1">
                            Este será o cargo atribuído automaticamente a novos membros.
                        </p>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex-shrink-0 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center space-x-2"
                    >
                         <i className="fa-solid fa-pen-to-square"></i>
                         <span>Editar</span>
                    </button>
                </div>
            </div>

            <ModalPermissoes 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                permissions={permissions}
                onUpdatePermission={updatePermission}
            />
        </>
    );
};

export default CardCargoPadrao;
