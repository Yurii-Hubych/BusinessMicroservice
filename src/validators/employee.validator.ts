import Joi from "joi";
import {Types} from "mongoose";

export class EmployeeValidator {
    static employeeName = Joi.string().min(3).max(30).trim();
    static employeeSurname = Joi.string().min(3).max(30).trim();
    static _position = Joi.string().custom((value, helpers) => {
        if (!Types.ObjectId.isValid(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    })
    static _department = Joi.string().custom((value, helpers) => {
        if (!Types.ObjectId.isValid(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    })

    public static createEmployee = Joi.object({
        name: this.employeeName.required(),
        surname: this.employeeSurname.required(),
    });

    public static updateInfo = Joi.object({
        name: this.employeeName.required(),
        surname: this.employeeSurname.required(),
    })
}