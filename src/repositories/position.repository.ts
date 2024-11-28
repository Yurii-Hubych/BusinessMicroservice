import {IPosition} from "../interfaces/position.interface";
import {positionModel} from "../models/position";

class PositionRepository {
    public async createPosition(data: IPosition) {
        return await positionModel.create(data);
    }
}

export const positionRepository = new PositionRepository();