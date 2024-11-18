import {IPosition} from "../interfaces/position.interface";
import {positionModel} from "../models/position";

class PositionService {
    public async createPosition(data: IPosition) {
        return await positionModel.create(data);
    }
}

export const positionService = new PositionService();