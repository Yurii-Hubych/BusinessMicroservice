import {Router} from "express";
import {employeeController} from "../controllers/employee.controller";
import {commonMiddleware} from "../middlewares/common.middleware";
import {EmployeeValidator} from "../validators/employee.validator";
import {authMiddleware} from "../middlewares/auth.middleware";
import {employeeMiddleware} from "../middlewares/employee.middleware";


const router = Router();

router.get("",
    authMiddleware.CheckAccessToken,
    authMiddleware.CheckRequiredRole("manager"),
    employeeController.getEmployees);

router.post("",
    commonMiddleware.isBodyValid(EmployeeValidator.createEmployee),
    authMiddleware.CheckAccessToken,
    authMiddleware.CheckRequiredRole("admin"),
    employeeController.createEmployee);

router.get("/:employeeId",
    authMiddleware.CheckAccessToken,
    authMiddleware.CheckRequiredRole("manager"),
    commonMiddleware.isIdValid(["employeeId"]),
    employeeController.getEmployeeById);

router.patch("/updateInfo/:employeeId",
    authMiddleware.CheckAccessToken,
    authMiddleware.CheckRequiredRole("manager"),
    commonMiddleware.isBodyValid(EmployeeValidator.updateInfo),
    employeeMiddleware.FindAndCheckRightsToModify,
    commonMiddleware.isIdValid(["employeeId"]),
    employeeController.updateEmployeeInfo);

export const employeeRouter = router;