import { ObjectSchema } from "joi";
import {Response, Request, NextFunction} from "express";
import { isObjectIdOrHexString } from "mongoose";
import {ApiError} from "../errors/api.error";


export class CommonMiddleware {
    public isBodyValid(schema: ObjectSchema){
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const { error, value } = schema.validate(req.body);
                if (error) {
                    throw new ApiError(error.message, 400);
                }
                req.body = value;
                next();
            }
            catch (e) {
                next(e);
            }
        }
    }

    public isIdValid(idNames: string[]){
        return (req: Request, res: Response, next:NextFunction) => {
            try {
                const ids = idNames.map((item) => req.params[item]);

                ids.forEach(((item, index) => {
                    if (!isObjectIdOrHexString(item)){
                        throw new ApiError(`Invalid ${idNames[index]}`, 400);
                    }
                }))
                next();
            }
            catch (e) {
                next(e)
            }
        }
    }
}

export const commonMiddleware = new CommonMiddleware();