import {IDepartment} from "../interfaces/department.interface";
import {departmentRepository} from "../repositories/department.repository";


class DepartmentService {
    public async createDepartment(data: IDepartment): Promise<void> {
        await departmentRepository.createDepartment(data);
    }

    public async getDepartments(employeeId: string): Promise<IDepartment[]> {
        return await departmentRepository.getDepartments(employeeId);
    }

    public async updateDepartment(departmentId: string, data: IDepartment): Promise<void> {
        await departmentRepository.updateDepartment(departmentId, data);
    }

    public async deleteDepartment(departmentId: string): Promise<void> {
        await departmentRepository.deleteDepartment(departmentId);
    }

    public async getDepartmentsWithMembers(employeeId: string): Promise<IDepartment[]> {
        return await departmentRepository.getDepartmentsWithMembers(employeeId);
    }

    public async updateDepartmentInfo(departmentId: string, data: IDepartment): Promise<void> {
        await departmentRepository.updateDepartmentInfo(departmentId, data);
    }

    public async addMembersToDepartment(departmentId: string, members: string[]): Promise<void> {
        await departmentRepository.addMembersToDepartment(departmentId, members);
    }

    public async removeMembersFromDepartment(departmentId: string, members: string[]): Promise<void> {
        await departmentRepository.removeMembersFromDepartment(departmentId, members);
    }
}

export const departmentService = new DepartmentService();