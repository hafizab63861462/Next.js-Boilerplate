"use server";
import { ObjectId } from "mongodb";
import { dbConnection } from "@/service/db.connection";
import { ActionResult, User } from "@/service/user/types";
import bcrypt from "bcrypt";

const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const getUserById = async (userID: string) => {
  const { db } = await dbConnection(process.env.DB_NAME ?? "yasim");
  try {
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userID) });
    if (!user) return null;
    return {
      success: true,
      data: {
        ...user,
        _id: user._id?.toString(),
        createdAt: user.createdAt?.toISOString(),
        updatedAt: user.updatedAt?.toISOString(),
      },
    };
  } catch (error) {
    console.error("Error fetching user by openId:", error);
    return {
      success: false,
      data: null,
    };
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<ActionResult> => {
  const { db } = await dbConnection(process.env.DB_NAME ?? "yasim");

  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }

  try {
    const user = await db.collection<User>("users").findOne({ email });
    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return { success: false, error: "Invalid email or password" };
    }

    return {
      success: true,
      data: {
        _id: user._id?.toString(),
        email: user.email,
        createdAt: user.createdAt?.toISOString(),
        updatedAt: user.updatedAt?.toISOString(),
      },
    };
  } catch (error) {
    console.error("Error during login:", error);
    return {
      success: false,
      error: "Something went wrong during login. Please try again.",
    };
  }
};
