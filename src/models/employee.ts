import {model, Schema, Types} from "mongoose";
import {IEmployee} from "../interfaces/employee.interface";

const employeeRole = new Types.ObjectId("671569be9d7fb8dd620d6b85")


const employeeSchema = new Schema<IEmployee>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: false,
        trim: true
    },
    _position: {
        type: Schema.Types.ObjectId,
        required: false,
        trim: true,
        ref: "Position",
        default: [employeeRole]
    },
    roles: {
        type: [String],
        required: false,
        trim: true,
        set: (roles: string[]) => [...new Set(roles)],
    },
    isBlocked: {
        type: Boolean,
        required: true,
        trim: true,
        default: false
    }
}, { versionKey: false, timestamps: true });

export const employeeModel = model('Employee', employeeSchema);
