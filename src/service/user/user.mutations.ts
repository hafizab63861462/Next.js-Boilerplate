"use server";
import { dbConnection } from "@/service/db.connection";
import bcrypt from "bcrypt";
import { ActionResult, User } from "@/service/user/types";

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const signupUser = async (
  email: string,
  password: string,
  confirmPassword: string
): Promise<ActionResult> => {
  const { db } = await dbConnection(process.env.DB_NAME ?? "yasim");

  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      error: "Password and confirm password should match",
    };
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return { success: false, error: "Invalid email format" };
  }

  try {
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return { success: false, error: "User with this email already exists" };
    }

    const hashedPassword = await hashPassword(password);

    const newUser: User = {
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const user = await db.collection("users").insertOne(newUser);

    return {
      success: true,
      data: {
        _id: user.insertedId.toString(),
        email,
        createdAt: newUser.createdAt?.toISOString(),
        updatedAt: newUser.updatedAt?.toISOString(),
      },
    };
  } catch (error) {
    console.error("Error during signup:", error);
    return {
      success: false,
      error: "Something went wrong during registration. Please try again.",
    };
  }
};
