import {config} from "dotenv";

config();

export const configs = {
    DB_URL: process.env.DB_URL || "",
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "",
    PORT_BUSINESS_SERVICE: process.env.PORT_BUSINESS_SERVICE || "3002",
    DB_BUSINESS_URL: process.env.DB_BUSINESS_URL || "",
    DB_URl_DEV: process.env.DB_URl_DEV || "",
}