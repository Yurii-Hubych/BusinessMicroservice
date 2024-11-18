import {IDepartment} from "../interfaces/department.interface";
import {departmentModel} from "../models/department";

class DepartmentService {
    public async createDepartment(data: IDepartment): Promise<void> {
        await departmentModel.create(data);
    }

    public async getDepartments(): Promise<IDepartment[]> {
        return await departmentModel.find();
    }

    public async updateDepartment(departmentId: string, data: IDepartment): Promise<void> {
        await departmentModel.findByIdAndUpdate({_id: departmentId}, data);
    }

    public async deleteDepartment(departmentId: string): Promise<void> {
        await departmentModel.findByIdAndDelete({_id: departmentId});
    }

    public async getDepartmentsWithMembers(): Promise<IDepartment[]> {
        return await departmentModel.find().populate("members").populate("_adminUser");
    }

    public async updateDepartmentInfo(departmentId: string, data: IDepartment): Promise<void> {
        await departmentModel.findByIdAndUpdate({_id: departmentId}, {name: data.name});
    }

    public async addMembersToDepartment(departmentId: string, members: string[]): Promise<void> {
        await departmentModel.findByIdAndUpdate({_id: departmentId}, {$addToSet: {members: members}});
    }
}

export const departmentService = new DepartmentService();