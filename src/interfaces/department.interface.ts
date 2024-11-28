import {Schema, Types} from "mongoose";

export interface IDepartment {
    _id: Schema.Types.ObjectId;
    name: string;
    _adminUser: Types.ObjectId;
    members: Schema.Types.ObjectId[];
}