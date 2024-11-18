import {Router} from "express";
import {departmentController} from "../controllers/department.controller";
import {commonMiddleware} from "../middlewares/common.middleware";
import {DepartmentValidator} from "../validators/department.validator";
import {departmentMiddleware} from "../middlewares/department.middleware";
import {IDepartment} from "../interfaces/department.interface";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router.get("",
    authMiddleware.CheckAccessToken,
    authMiddleware.CheckRequiredRole("manager"),
    departmentController.getDepartments);

router.post("",
    authMiddleware.CheckAccessToken,
    authMiddleware.CheckRequiredRole("manager"),
    commonMiddleware.isBodyValid(DepartmentValidator.createDepartment),
    departmentMiddleware.FindOrThrow<IDepartment>("name"),
    departmentController.createDepartment);

router.delete("/:departmentId",
    authMiddleware.CheckAccessToken,
    authMiddleware.CheckRequiredRole("manager"),
    commonMiddleware.isIdValid(["departmentId"]),
    departmentController.deleteDepartment);

router.put("/:departmentId",
    authMiddleware.CheckAccessToken,
    authMiddleware.CheckRequiredRole("manager"),
    commonMiddleware.isIdValid(["departmentId"]),
    commonMiddleware.isBodyValid(DepartmentValidator.updateDepartment),
    departmentController.updateDepartment);

router.patch("/:departmentId",
    authMiddleware.CheckAccessToken,
    authMiddleware.CheckRequiredRole("manager"),
    commonMiddleware.isIdValid(["departmentId"]),
    commonMiddleware.isBodyValid(DepartmentValidator.updateDepartmentInfo),
    departmentController.updateDepartmentInfo)

router.get("/withMembers",
    authMiddleware.CheckAccessToken,
    authMiddleware.CheckRequiredRole("manager"),
    departmentController.getDepartmentsWithMembers);

//TODO restrict access to only owner of department
//TODO add validation for members
router.patch("/:departmentId/addMembers",
    authMiddleware.CheckAccessToken,
    authMiddleware.CheckRequiredRole("manager"),
    //commonMiddleware.isBodyValid(DepartmentValidator.addMembers),
    departmentMiddleware.FindOrThrow<IDepartment>("name"),
    departmentController.addMembersToDepartment)

export const departmentRouter = router