import {model, Schema} from "mongoose";
import {IDepartment} from "../interfaces/department.interface";

const departmentSchema = new Schema<IDepartment>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    _adminUser: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    members: {
        type: [Schema.Types.ObjectId],
        ref: 'Employee',
        required: true,
        validate: {
            validator: function (members: Schema.Types.ObjectId[]) {
                const uniqueMembers = new Set(members.map((member) => member.toString()));
                return uniqueMembers.size === members.length;
            },
            message: "Members must be unique.",
        }
    }
    //TODO link positions to department
}, {versionKey: false, timestamps: true});

export const departmentModel = model('Department', departmentSchema);
