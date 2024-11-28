import {IPosition} from "../interfaces/position.interface";
import {positionRepository} from "../repositories/position.repository";

class PositionService {
    public async createPosition(data: IPosition) {
        return await positionRepository.createPosition(data);
    }
}

export const positionService = new PositionService();