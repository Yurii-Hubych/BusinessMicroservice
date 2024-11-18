import {Schema} from "mongoose";

export interface IPosition {
    _id: Schema.Types.ObjectId,
    name: string,
    description: string
}