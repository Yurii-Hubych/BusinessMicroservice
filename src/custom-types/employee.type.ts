import {IEmployee} from "../interfaces/employee.interface";

export type UpdateEmploeeInfo =  Pick<IEmployee, "name" | "surname">