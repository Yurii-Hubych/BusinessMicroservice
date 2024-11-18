import {Schema, model} from "mongoose";
import {IPosition} from "../interfaces/position.interface";

const PositionScheme = new Schema<IPosition>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
}, {versionKey: false, timestamps: true});

export const positionModel = model("Position", PositionScheme);