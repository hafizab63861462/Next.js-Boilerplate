import { ObjectId } from "mongodb";
export interface IUserProfile {
  _id: string;
  name?: string;
  userName?: string;
  createdAt: string;
  updatedAt: string;
}

export type ActionResult =
  | { success: true; data: any; token: string }
  | { success: false; error: string };

export type User = {
  _id?: ObjectId;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};
