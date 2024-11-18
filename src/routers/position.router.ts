import {Router} from "express";
import {positionController} from "../controllers/position.controller";

const router = Router();

router.post("", positionController.createPosition);

export const positionRouter = router;