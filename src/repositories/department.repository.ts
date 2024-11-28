import {IDepartment} from "../interfaces/department.interface";
import {departmentModel} from "../models/department";

class DepartmentRepository {
    public async createDepartment(data: IDepartment): Promise<void> {
        await departmentModel.create(data);
    }

    public async getDepartments(employeeId: string): Promise<IDepartment[]> {
        if (employeeId) {
            return departmentModel.find({_adminUser: employeeId})
        }
        return departmentModel.find();
    }

    public async updateDepartment(departmentId: string, data: IDepartment): Promise<void> {
        await departmentModel.findByIdAndUpdate({_id: departmentId}, data);
    }

    public async deleteDepartment(departmentId: string): Promise<void> {
        await departmentModel.findByIdAndDelete({_id: departmentId});
    }

    public async getDepartmentsWithMembers(employeeId: string): Promise<IDepartment[]> {
        if (employeeId) {
            return departmentModel.find({_adminUser: employeeId}).populate("members").populate("_adminUser");
        }
        return departmentModel.find().populate("members").populate("_adminUser");
    }

    public async updateDepartmentInfo(departmentId: string, data: IDepartment): Promise<void> {
        await departmentModel.findByIdAndUpdate({_id: departmentId}, {name: data.name});
    }

    public async addMembersToDepartment(departmentId: string, members: string[]): Promise<void> {
        await departmentModel.findByIdAndUpdate({_id: departmentId}, {members: members});
    }

    public async removeMembersFromDepartment(departmentId: string, members: string[]): Promise<void> {
        await departmentModel.findByIdAndUpdate({_id: departmentId}, {$pull: {members: {$in: members}}});
    }
}

export const departmentRepository = new DepartmentRepository();