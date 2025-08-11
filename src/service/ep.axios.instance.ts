import axios from "axios";
import { ObjectId } from 'mongodb';
import { v4 as uuidv4 } from "uuid";

import { dbConnection } from "@/service/db.connection";

const { DB_NAME } = process.env;

export const epInstance = axios.create({
    timeout: 15 * 60 * 1000, // 15 minutes timeout
    validateStatus: status => {
        return status < 500; // Accept all status codes below 500
    },
    headers: {
        "X-Request-ID": uuidv4() // Unique request ID for tracing
    },
});

// First interceptor: create log in db
epInstance.interceptors.request.use(
    async config => {
        const { db } = await dbConnection(DB_NAME ?? "quick-tupup");
        const collectionLogs = db.collection("ep-logs");
        let dataToLog = config?.data ?? null;

        // Handle FormData: convert to plain object for logging
        if (typeof FormData !== "undefined" && config.data instanceof FormData) {
            const formObj: Record<string, any> = {};
            for (const [key, value] of config.data.entries()) {
                formObj[key] = value;
            }
            dataToLog = formObj;
        }
        const id = await collectionLogs.insertOne({
            source: "easy-paisa",
            url: config.url,
            method: config.method,
            headers: config.headers,
            data: dataToLog,
            query: config?.params ?? null,
            request_id: config?.headers?.["X-Request-ID"] ?? null,
            createdAt: new Date(),
            updatedAt: new Date(),
            requestTimeStart: new Date()
        });
        config.headers["X-EP-Log-Id"] = id.insertedId.toString();
        return config;
    },
    error => {
        return Promise.reject(new Error(error));
    }
);

// Second interceptor: update log in db
epInstance.interceptors.response.use(
    async response => {
        const { db } = await dbConnection(DB_NAME ?? "quick-tupup");
        const collectionLogs = db.collection("ep-logs");
        const logId: string = response.config.headers["X-EP-Log-Id"];
        if (logId) {
            await collectionLogs.updateOne(
                { _id: new ObjectId(logId) },
                {
                    $set: {
                        status_code: response.status,
                        status_text: response.statusText,
                        response: response?.data ?? null,
                        updatedAt: new Date(),
                        requestTimeEnd: new Date()

                    }
                }
            );
        }
        return response;
    },
    async (error) => {
        const { db } = await dbConnection(DB_NAME ?? "quick-tupup");
        const collectionLogs = db.collection("ep-logs");
        const logId: string = error?.config?.headers?.["X-EP-Log-Id"];
        const errorMessage = error?.response?.data ?? error.message ?? "Unknown error";
        if (logId) {
            collectionLogs.updateOne(
                { _id: new ObjectId(logId) },
                {
                    $set: {
                        status_code: error?.response?.status ?? 500,
                        status_text: error?.response?.statusText ?? "Error",
                        response: errorMessage,
                        updatedAt: new Date(),
                        requestTimeEnd: new Date()
                    }
                }
            ).catch(err => console.error("Failed to update log:", err));
        }
        return Promise.reject(new Error(error));
    }
);