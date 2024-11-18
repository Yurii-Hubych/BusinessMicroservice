import {NextFunction, Request, Response} from "express";
import {ApiError} from "../errors/api.error";
import {employeeModel} from "../models/employee";
import {roleServices} from "../services/role.service";

class EmployeeMiddleware {
    public FindOrThrow<T> (field: keyof T) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const employee = await employeeModel.findOne({[field]: req.body[field]});
                if (employee) {
                    throw new ApiError("Department already exists", 400);
                }

                next();
            } catch (e) {
                next(e);
            }
        }
    }

    public async FindAndCheckRightsToModify (req: Request, res: Response, next: NextFunction) {
        try {
            const { employeeId } = req.params;
            const requesterId = res.locals.tokenPayload.userId;

            if (employeeId === requesterId) {
                return next();
            }

            const user = await employeeModel.findById(employeeId);
            if (!user) {
                return next(new ApiError("User doesn't exist", 400));
            }

            const requesterRoles = res.locals.tokenPayload._roles;
            const targetRoles = user.roles;
            const highestRole = roleServices.getHighestRole(targetRoles);

            if (!roleServices.canModifyRoles(requesterRoles, highestRole)) {
                return next(new ApiError("Access denied. Insufficient permissions.", 403));
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const employeeMiddleware = new EmployeeMiddleware();