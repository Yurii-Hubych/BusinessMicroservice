import {Request, Response, NextFunction} from "express";
import {employeeService} from "../services/employee.service";

class EmployeeController {
    public async createEmployee(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await employeeService.createEmployee(req.body);
            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    }

    public async getAllEmployees(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await employeeService.getAllEmployees();
            res.status(200).json(users);
        } catch (e) {
            next(e);
        }
    }

    public async updateEmployeeInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const {employeeId} = req.params;
            await employeeService.updateEmployeeInfo(employeeId, req.body);
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }

    public async getEmployeeById(req: Request, res: Response, next: NextFunction) {
        try {
            const {employeeId} = req.params;
            const user = await employeeService.getEmployeeById(employeeId);
            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    }

    public async deleteEmployee(req: Request, res: Response, next: NextFunction) {
        try {
            const {employeeId} = req.params;
            await employeeService.deleteEmployee(employeeId);
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }

    public async searchForEmployees(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.query.query);
            const query = (req.query.query as string).trim();
            if (!query) {
                res.status(400).json({message: "Query is required"});
                return;
            }
            const users = await employeeService.searchForEmployees(query as string);
            res.status(200).json(users);
        } catch (e) {
            next(e);
        }
    }
}

export const employeeController = new EmployeeController();
