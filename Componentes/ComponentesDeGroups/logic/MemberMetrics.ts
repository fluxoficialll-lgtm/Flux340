
import { GroupRole } from "../../../tipos";
import { ROLE_WEIGHTS } from "../../../constants/RoleWeights";

export const MemberMetrics = {
    process: (members: any[], roles: GroupRole[]) => {

        const safeMembers = Array.isArray(members) ? members : [];
        const safeRoles = Array.isArray(roles) ? roles : [];

        const ownerCount = safeMembers.filter(m => m.role === 'owner').length;
        
        const customRoleCounts = safeRoles.map(role => ({
            ...role,
            count: safeMembers.filter(m => m.roleId === role.id).length
        }));

        const unassignedCount = safeMembers.filter(m => !m.role && !m.roleId).length;

        const totalPower = safeMembers.reduce((sum, member) => {
            let weight = ROLE_WEIGHTS['Membro'] || 10;
            if (member.role === 'owner') {
                weight = ROLE_WEIGHTS['Dono'] || 100;
            } else if (member.roleId) {
                const role = safeRoles.find(r => r.id === member.roleId);
                if (role && ROLE_WEIGHTS[role.name]) {
                    weight = ROLE_WEIGHTS[role.name];
                } else {
                    weight = ROLE_WEIGHTS['Membro'] || 10; 
                }
            }
            return sum + weight;
        }, 0);


        return {
            counts: {
                owner: ownerCount,
                customRoles: customRoleCounts,
                unassigned: unassignedCount,
            },
            totalPower,
        };
    }
};
