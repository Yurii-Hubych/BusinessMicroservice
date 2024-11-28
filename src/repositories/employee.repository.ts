import {IEmployee} from "../interfaces/employee.interface";
import {employeeModel} from "../models/employee";
import {UpdateEmploeeInfo} from "../custom-types/employee.type";
import { faker } from '@faker-js/faker'
import mongoose from "mongoose";

class EmployeeRepository {
    public async createEmployee(employee: IEmployee): Promise<IEmployee | undefined> {
        return await employeeModel.create(employee);
    }

    public async getAllEmployees(): Promise<IEmployee[]> {
        return employeeModel.aggregate([
            {
                $lookup: {
                    from: 'positions',
                    localField: '_position',
                    foreignField: '_id',
                    as: 'positionDetails',
                },
            },
            {$unwind: {path: '$positionDetails', preserveNullAndEmptyArrays: true}},

            {
                $lookup: {
                    from: 'departments',
                    let: {employeeId: '$_id'},
                    pipeline: [
                        {$match: {$expr: {$in: ['$$employeeId', '$members']}}},
                        {$project: {name: 1}}
                    ],
                    as: 'departmentDetails'
                }
            },

            {
                $project: {
                    _id: 1,
                    name: 1,
                    surname: 1,
                    isBlocked: 1,
                    roles: 1,
                    _position: {name: '$positionDetails.name'},
                    _department: {
                        $cond: {if: {$not: '$departmentDetails'}, then: null, else: {name: '$departmentDetails.name'}}
                    }
                },
            },
        ]);
    }

    public async updateEmployee(employeeId: string, employee: IEmployee): Promise<IEmployee | null> {
        return employeeModel.findByIdAndUpdate(employeeId, employee);
    }

    public async getEmployeeById(employeeId: string): Promise<IEmployee | null> {
        return employeeModel.findById(employeeId);
    }

    public async deleteEmployee(employeeId: string): Promise<void> {
        await employeeModel.findByIdAndDelete(employeeId);
    }

    public async assignRoleToEmployee({userId, role}: { userId: string, role: string }): Promise<void> {
        await employeeModel.findByIdAndUpdate(userId, {$addToSet: {roles: role}}, {new: true});
    }

    public async updateEmployeeInfo(employeeId: string, employee: UpdateEmploeeInfo) {
        return employeeModel.findByIdAndUpdate(
            employeeId,
            {name: employee.name, surname: employee.surname}
        );
    }

    public async blockEmployee(employeeId: string): Promise<void> {
        await employeeModel.findByIdAndUpdate(employeeId, {isBlocked: true});
    }

    public async unblockEmployee(employeeId: string): Promise<void> {
        await employeeModel.findByIdAndUpdate(employeeId, {isBlocked: false});
    }

    public async searchForEmployees(searchQuery: string): Promise<IEmployee[]> {
        const start = Date.now();
        const response = employeeModel.aggregate([
            {
                $lookup: {
                    from: 'positions',
                    localField: '_position',
                    foreignField: '_id',
                    as: 'positionDetails'
                }
            },
            {$unwind: {path: '$positionDetails', preserveNullAndEmptyArrays: true}},

            {
                $lookup: {
                    from: 'departments',
                    let: {employeeId: '$_id'},
                    pipeline: [
                        {$match: {$expr: {$in: ['$$employeeId', '$members']}}},
                        {$project: {name: 1}}
                    ],
                    as: 'departmentDetails'
                }
            },

            {
                $match: {
                    $or: [
                        {name: {$regex: searchQuery, $options: 'i'}},
                        {surname: {$regex: searchQuery, $options: 'i'}},
                        {'departmentDetails.name': {$regex: searchQuery, $options: 'i'}},
                        {'positionDetails.name': {$regex: searchQuery, $options: 'i'}}
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
                    _position: {name: '$positionDetails.name'},
                    _department: {
                        $cond: {if: {$not: '$departmentDetails'}, then: null, else: {name: '$departmentDetails.name'}}
                    }
                }
            }
        ]);
        const end = Date.now();
        console.log(`Query Time: ${end - start}ms`);

        return response;
    }

    public async getEmployeesWithoutDepartment(): Promise<IEmployee[]> {
        return employeeModel.aggregate([
            {
                $lookup: {
                    from: 'departments',
                    let: {employeeId: '$_id'},
                    pipeline: [
                        {$match: {$expr: {$in: ['$$employeeId', '$members']}}}
                    ],
                    as: 'departmentDetails'
                }
            },
            {$match: {departmentDetails: []}},
            {$unwind: {path: '$positionDetails', preserveNullAndEmptyArrays: true}},
            {$match: {isBlocked: false}},
            {
                $project: {
                    _id: 1,
                    name: 1,
                    surname: 1,
                    isBlocked: 1
                }
            }
        ]);
    }

    public async generateEmployees() {
        const employees = [];
        for (let i = 0; i < 10000; i++) {
            employees.push({
                name: faker.name.firstName(),
                surname: faker.name.lastName(),
                _position: new mongoose.Types.ObjectId(),
                roles: ['user'],
                isBlocked: faker.datatype.boolean(),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        try {
            // Insert employees into MongoDB
            await employeeModel.insertMany(employees);
            console.log('10,000 employees inserted successfully!');
        } catch (error) {
            console.error('Error inserting employees:', error);
        }
    }

    public async deleteGeneratedEmployees(){
        const employeesToDelete = await employeeModel.find({})
            .sort({ createdAt: -1 }) // Sort by creation date descending
            .limit(10000)
            .select('_id'); // Only fetch the IDs

        const ids = employeesToDelete.map((emp) => emp._id);

        // Delete the documents by IDs
        await employeeModel.deleteMany({ _id: { $in: ids } });
    }
}

export const employeeRepository = new EmployeeRepository();