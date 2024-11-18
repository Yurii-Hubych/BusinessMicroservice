import {Schema} from "mongoose";

export interface IEmployee {
    _id: Schema.Types.ObjectId;
    name: string;
    surname: string;
    _position: Schema.Types.ObjectId;
    roles: string[];
    _department: Schema.Types.ObjectId;
    isBlocked: boolean;
}