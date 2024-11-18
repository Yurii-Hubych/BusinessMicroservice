import { Response, Request, NextFunction} from "express";
import {positionService} from "../services/position.service";

class PositionController {
    public async createPosition(req: Request, res: Response, next: NextFunction) {
        try {
            const position = await positionService.createPosition(req.body);
            res.status(200).json(position);
        } catch (e) {
            next(e);
        }
    }
}

export const positionController = new PositionController();