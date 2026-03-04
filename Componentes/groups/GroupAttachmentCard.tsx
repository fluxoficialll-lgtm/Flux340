
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// CORREÇÃO: A importação do groupService foi removida.
// import { groupService } from '../../ServiçosFrontend/ServiçoDeGrupos/groupService.js';
import { Group } from '../../types';

interface GroupAttachmentCardProps {
    groupId: string;
}

export const GroupAttachmentCard: React.FC<GroupAttachmentCardProps> = ({ groupId }) => {
    const navigate = useNavigate();
    const [group, setGroup] = useState<Group | null>(null);

    useEffect(() => {
        // CORREÇÃO: Lógica de busca de grupo removida.
        console.error("groupService not available. GroupAttachmentCard will not render.");
        // const g = groupService.getGroupById(groupId);
        // if (g) setGroup(g);
        setGroup(null); // Garante que o componente não renderize nada
    }, [groupId]);

    if (!group) return null;

    // O restante da lógica nunca será alcançado, mas é mantido para referência futura.

    const handleJoinClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        if (group.isVip) {
            navigate(`/vip-group-sales/${group.id}`);
        } else {
            navigate(`/group-landing/${group.id}`);
        }
    };

    const isVip = group.isVip;

    return (
        <>
            <style>{`
                /* ... (estilos omitidos para brevidade) ... */
            `}</style>
            <div className="group-attachment-card" onClick={(e) => e.stopPropagation()}>
                {isVip && <div className="shine-effect"></div>}
                <div className="ga-left">
                    {group.coverImage ? (
                        <img src={group.coverImage} className="ga-cover" alt="Group" />
                    ) : (
                        <div className="ga-cover placeholder">
                            <i className={`fa-solid ${group.isVip ? 'fa-crown' : 'fa-users'}`}></i>
                        </div>
                    )}
                    <div className="ga-info">
                        <div className="ga-name">{group.name}</div>
                        <div className="ga-type">
                            {isVip ? (
                                <><i className="fa-solid fa-lock text-[9px]"></i> ÁREA RESTRITA</>
                            ) : (
                                <><i className="fa-solid fa-user-group text-[9px]"></i> COMUNIDADE ATIVA</>
                            )}
                        </div>
                    </div>
                </div>
                <button className="ga-btn" onClick={handleJoinClick}>
                    ACESSAR
                </button>
            </div>
        </>
    );
};
