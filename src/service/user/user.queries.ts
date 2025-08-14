"use server";
import { ObjectId } from "mongodb";
import { dbConnection } from "@/service/db.connection";

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
