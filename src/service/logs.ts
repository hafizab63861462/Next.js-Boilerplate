"use server";

export const logOnServer = async (message: string, data: any) => {
    console.log(message, "Server logged:", data);
}