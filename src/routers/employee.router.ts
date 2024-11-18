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
    employeeController.getAllEmployees);

router.post("",
    commonMiddleware.isBodyValid(EmployeeValidator.createEmployee),
    employeeController.createEmployee);

router.get("/search/",
    authMiddleware.CheckAccessToken,
    authMiddleware.CheckRequiredRole("manager"),
    employeeController.searchForEmployees);

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


/*router.delete("/:employeeId",
    authMiddleware.CheckAccessToken,
    authMiddleware.CheckRequiredRole("manager"),
    commonMiddleware.isIdValid(["employeeId"]),
    employeeController.deleteEmployee);*/

export const employeeRouter = router;