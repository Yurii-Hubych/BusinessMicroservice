import express, {Request, Response, NextFunction} from 'express';
import * as mongoose from "mongoose";
import {configs} from "./configs/configs";
import {ApiError} from "./errors/api.error";
import {employeeRouter} from "./routers/employee.router";
import {positionRouter} from "./routers/position.router";
import {departmentRouter} from "./routers/department.router";
import {rabbitMQ} from "./rabbitMQ";
import {subscribeToQueues} from "./rabbitMQ/subscribeToQueues";


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const port = 3002;

app.use("/employee", employeeRouter);
app.use("/position", positionRouter);
app.use("/department", departmentRouter);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status: number = err.status || 500;
    res.status(status).json({message: err.message});
})

app.listen(port, async () => {
    await mongoose.connect(configs.DB_URl_DEV);
    await rabbitMQ.connect();
    await subscribeToQueues();
    console.log(`Server listening on port ${configs.PORT_BUSINESS_SERVICE}`);
})

