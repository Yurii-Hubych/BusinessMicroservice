import {ApiError} from "../errors/api.error";
import {departmentModel} from "../models/department";
import {Response, Request, NextFunction} from "express";

class DepartmentMiddleware {
    public FindOrThrow<T> (field: keyof T) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const department = await departmentModel.findOne({[field]: req.body[field]});
                if (department) {
                    throw new ApiError("Department already exists", 400);
                }

                next();
            } catch (e) {
                next(e);
            }
        }
    }
}

export const departmentMiddleware = new DepartmentMiddleware();