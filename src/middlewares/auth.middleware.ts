import { Response, Request, NextFunction} from "express";
import {ApiError} from "../errors/api.error";
import {tokenService} from "../services/token.service";
import {employeeModel} from "../models/employee";

class AuthMiddleware {
    public async CheckAccessToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const accessToken = req.headers.authorization;
            if (!accessToken) {
                throw new ApiError("Access token is missing", 401);
            }

            const tokenPayload = tokenService.checkAccessToken(accessToken);

            if (tokenPayload.isBlocked) {
                throw new ApiError("Your account is blocked", 401);
            }
            const employee = await employeeModel.findById(tokenPayload._id);
            if (!employee) {
                throw new ApiError("Employee not found", 401);
            }

            if(employee.isBlocked === true){
                throw new ApiError("Your account is blocked", 401);
            }

            res.locals.tokenPayload = tokenPayload;
            next();
        } catch (e) {
            next(e);
        }
    }

    public CheckRequiredRole(role: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const tokenPayload = res.locals.tokenPayload;
                if (!tokenPayload._roles.includes(role)) {
                    throw new ApiError("Access denied", 403);
                }
                next();
            } catch (e) {
                next(e);
            }
        }
    }
}

export const authMiddleware = new AuthMiddleware();

