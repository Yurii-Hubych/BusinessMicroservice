import {Request, Response, NextFunction} from 'express';
import {departmentService} from "../services/department.service";

class DepartmentController {
    public async createDepartment(req: Request, res: Response, next: NextFunction) {
        try {
            await departmentService.createDepartment(req.body);
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }

    public async getDepartments(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = res.locals.tokenPayload._roles.includes("admin") ?  null : res.locals.tokenPayload._id;
            const departments = await departmentService.getDepartments(userId);
            res.status(200).json(departments);
        } catch (e) {
            next(e);
        }
    }

    public async updateDepartment(req: Request, res: Response, next: NextFunction) {
        try {
            const {departmentId} = req.params;
            await departmentService.updateDepartment(departmentId, req.body);
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }

    public async deleteDepartment(req: Request, res: Response, next: NextFunction) {
        try {
            const {departmentId} = req.params;
            await departmentService.deleteDepartment(departmentId);
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }

    public async getDepartmentsWithMembers(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = res.locals.tokenPayload._roles.includes("admin") ?  null : res.locals.tokenPayload._id;
            const departments = await departmentService.getDepartmentsWithMembers(userId);
            res.status(200).json(departments);
        } catch (e) {
            next(e);
        }
    }

    public async updateDepartmentInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const {departmentId} = req.params;
            await departmentService.updateDepartmentInfo(departmentId, req.body);
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }

    public async addMembersToDepartment(req: Request, res: Response, next: NextFunction) {
        try {
            const {departmentId} = req.params;
            await departmentService.addMembersToDepartment(departmentId, req.body);
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }

    public async removeMembersFromDepartment(req: Request, res: Response, next: NextFunction) {
        try {
            const {departmentId} = req.params;
            await departmentService.removeMembersFromDepartment(departmentId, req.body);
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }
}

export const departmentController = new DepartmentController();