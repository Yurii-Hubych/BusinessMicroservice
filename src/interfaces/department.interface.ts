import {Schema} from "mongoose";

export interface IDepartment {
    _id: Schema.Types.ObjectId;
    name: string;
    _adminUser: Schema.Types.ObjectId;
    members: Schema.Types.ObjectId[];
}