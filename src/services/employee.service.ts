import {IEmployee} from "../interfaces/employee.interface";
import {employeeModel} from "../models/employee";
import {UpdateEmploeeInfo} from "../custom-types/employee.type";

class EmployeeService {
    public async createEmployee(employee: IEmployee ):Promise<IEmployee | undefined> {
        try {
            return await employeeModel.create(employee);
        }
        catch (e) {
            console.log(e)
        }
    }

    public async getAllEmployees(): Promise<IEmployee[]> {
        const employees = await employeeModel.aggregate([
            {
                $lookup: {
                    from: 'positions',
                    localField: '_position',
                    foreignField: '_id',
                    as: 'positionDetails'
                }
            },
            { $unwind: { path: '$positionDetails', preserveNullAndEmptyArrays: true } },

            {
                $lookup: {
                    from: 'departments',
                    let: { employeeId: '$_id' },
                    pipeline: [
                        { $match: { $expr: { $in: ['$$employeeId', '$members'] } } },
                        { $project: { name: 1, _id: 0 } }
                    ],
                    as: 'departmentDetails'
                }
            },
            { $unwind: { path: '$departmentDetails', preserveNullAndEmptyArrays: true } },

            {
                $project: {
                    _id: 1,
                    name: 1,
                    surname: 1,
                    isBlocked: 1,
                    roles: 1,
                    _position: { name: '$positionDetails.name' },
                    _department: { name: '$departmentDetails.name' }
                }
            }
        ]);

        return employees;
    }

    public async updateEmployee(employeeId: string, employee: IEmployee): Promise<IEmployee | null> {
        return await employeeModel.findByIdAndUpdate(employeeId, employee);
    }

    public async getEmployeeById(employeeId: string):Promise<IEmployee | null> {
        return await employeeModel.findById(employeeId);
    }

    public async deleteEmployee(employeeId: string):Promise<void> {
        await employeeModel.findByIdAndDelete(employeeId);
    }

    public async asignRoleToEmployee({userId, role}: {userId: string, role: string}):Promise<void> {
        try {
            await employeeModel.findByIdAndUpdate(userId, {$addToSet: {roles: role}}, {new: true});
        }
        catch (e) {
            console.log(e)
        }
    }

    public async updateEmployeeInfo(employeeId: string,employee: UpdateEmploeeInfo) {
        return employeeModel.findByIdAndUpdate(
            employeeId,
            {name: employee.name, surname: employee.surname}
        );
    }

    public async blockEmployee(employeeId: string): Promise<void> {
        try {
            await employeeModel.findByIdAndUpdate(employeeId, {isBlocked: true});
        }
        catch (e) {
            console.log(e)
        }
    }

    public async unblockEmployee(employeeId: string): Promise<void> {
        try {
            await employeeModel.findByIdAndUpdate(employeeId, {isBlocked: false});
        }
        catch (e) {
            console.log(e)
        }
    }

    public async searchForEmployees(searchQuery: string):Promise<IEmployee[]> {
        const results = await employeeModel.aggregate([
            {
                $lookup: {
                    from: 'positions',
                    localField: '_position',
                    foreignField: '_id',
                    as: 'positionDetails'
                }
            },
            { $unwind: { path: '$positionDetails', preserveNullAndEmptyArrays: true } },

            {
                $lookup: {
                    from: 'departments',
                    let: { employeeId: '$_id' },
                    pipeline: [
                        { $match: { $expr: { $in: ['$$employeeId', '$members'] } } },
                        { $project: { name: 1 } }
                    ],
                    as: 'departmentDetails'
                }
            },
            { $unwind: { path: '$departmentDetails', preserveNullAndEmptyArrays: true } },

            {
                $match: {
                    $or: [
                        { name: { $regex: searchQuery, $options: 'i' } },
                        { surname: { $regex: searchQuery, $options: 'i' } },
                        { 'departmentDetails.name': { $regex: searchQuery, $options: 'i' } },
                        { 'positionDetails.name': { $regex: searchQuery, $options: 'i' } }
                    ]
                }
            },

            {
                $project: {
                    isBlocked: 1,
                    name: 1,
                    surname: 1,
                    roles: 1,
                    _id: 1,
                    _position: { name: '$positionDetails.name' },
                    _department: {
                        $cond: { if: { $not: '$departmentDetails' }, then: null, else: { name: '$departmentDetails.name' } }
                    }
                }
            }
        ]);


        return results;
    }
}

export const employeeService = new EmployeeService();