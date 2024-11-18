import {rolePermissions, rolePriority} from "../constants/role.constants";

class RoleService {
    public canModifyRoles(requesterRoles: string[], targetRole: string): boolean {
        return requesterRoles.some((role) => rolePermissions[role]?.canModifyRoles.includes(targetRole));
    }

    public getHighestRole(roles: string[]): string {
        const rolesOrder = rolePriority;
        return roles.reduce((acc, role) => {
            return rolesOrder[role] > rolesOrder[acc] ? role : acc;
        })
    }
}

export const roleServices = new RoleService();