import {rabbitMQ} from "./index";
import amqp from "amqplib";
import {employeeService} from "../services/employee.service";

export const subscribeToQueues = async (): Promise<void> => {
    rabbitMQ.subscribe("deleteUser", async (msg: amqp.ConsumeMessage | null) => {
        if (msg) {
            try {
                const user = JSON.parse(msg.content.toString());
                await employeeService.deleteEmployee(user)
            }
            catch (e) {
                console.log(e)
            }
        } else {
            console.error("Received null message");
        }
    });
    rabbitMQ.subscribe("blockUser", async (msg: amqp.ConsumeMessage | null) => {
        if (msg) {
            try {
                const employeeId = JSON.parse(msg.content.toString());
                await employeeService.blockEmployee(employeeId)
            }
            catch (e) {
                console.log(e)
            }
        } else {
            console.error("Received null message");
        }
    });
    rabbitMQ.subscribe("unblockUser", async (msg: amqp.ConsumeMessage | null) => {
        if (msg) {
            try {
                const employeeId = JSON.parse(msg.content.toString());
                await employeeService.unblockEmployee(employeeId)
            }
            catch (e) {
                console.log(e)
            }
        } else {
            console.error("Received null message");
        }
    });
    rabbitMQ.subscribe("registerUser", async (msg: amqp.ConsumeMessage | null) => {
        if (msg) {
            try {
                const user = JSON.parse(msg.content.toString());
                await employeeService.createEmployee(user)
            }
            catch (e) {
                console.log(e)
            }
        } else {
            console.error("Received null message");
        }
    });
    rabbitMQ.subscribe("asignRoleToUser", async (msg: amqp.ConsumeMessage | null) => {
        if (msg) {
            try {
                const userIdAndRole = JSON.parse(msg.content.toString());
                await employeeService.assignRoleToEmployee(userIdAndRole)
            }
            catch (e) {
                console.log(e)
            }
        } else {
            console.error("Received null message");
        }
    });
};
