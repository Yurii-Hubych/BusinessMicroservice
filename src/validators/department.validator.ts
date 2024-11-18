import Joi from "joi";
import { Types } from "mongoose";

export class DepartmentValidator {
    static departmentName = Joi.string().min(3).max(30).trim();
    static _adminUser = Joi.string().custom((value, helpers) => {
        if (!Types.ObjectId.isValid(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    })
    static members = Joi.array().items(
        Joi.string().custom((value, helpers) => {
            if (!Types.ObjectId.isValid(value)) {
                console.log(value);
                return helpers.error('any.invalid');
            }
            return value;
        })
    );

    public static createDepartment = Joi.object({
        name: this.departmentName.required(),
        _adminUser: this._adminUser.required()
    });

    public static updateDepartment = Joi.object({
        name: this.departmentName.required(),
        _adminUser: this._adminUser.required(),
        members: this.members.required()
    });

    public static updateDepartmentInfo = Joi.object({
        name: this.departmentName.required(),
    })

    public static addMembers = Joi.object({
        members: this.members.required()
    })
}