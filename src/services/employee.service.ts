import {IEmployee} from "../interfaces/employee.interface";
import {UpdateEmploeeInfo} from "../custom-types/employee.type";
import {employeeRepository} from "../repositories/employee.repository";

class EmployeeService {
    public async createEmployee(employee: IEmployee): Promise<IEmployee | undefined> {
        return await employeeRepository.createEmployee(employee);
    }

    public async getAllEmployees(): Promise<IEmployee[]> {
        return await employeeRepository.getAllEmployees();
    }

    public async updateEmployee(employeeId: string, employee: IEmployee): Promise<IEmployee | null> {
        return employeeRepository.updateEmployee(employeeId, employee);
    }

    public async getEmployeeById(employeeId: string): Promise<IEmployee | null> {
        return employeeRepository.getEmployeeById(employeeId);
    }

    public async deleteEmployee(employeeId: string): Promise<void> {
        await employeeRepository.deleteEmployee(employeeId);
    }

    public async assignRoleToEmployee({userId, role}: { userId: string, role: string }): Promise<void> {
        await employeeRepository.assignRoleToEmployee({userId, role});
    }

    public async updateEmployeeInfo(employeeId: string, employee: UpdateEmploeeInfo) {
        return employeeRepository.updateEmployeeInfo(employeeId, employee);
    }

    public async blockEmployee(employeeId: string): Promise<void> {
        await employeeRepository.blockEmployee(employeeId);
    }

    public async unblockEmployee(employeeId: string): Promise<void> {
        await employeeRepository.unblockEmployee(employeeId);
    }

    public async searchForEmployees(searchQuery: string): Promise<IEmployee[]> {
        return await employeeRepository.searchForEmployees(searchQuery);
    }

    public async getEmployeesWithoutDepartment(): Promise<IEmployee[]> {
        return await employeeRepository.getEmployeesWithoutDepartment();
    }
}

export const employeeService = new EmployeeService();