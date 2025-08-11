"use server";
//@ts-expect-error no types
import { createClient } from "redis";

type TRedisKey = `inquire:config:setting` | `dcb:merchant:${string}` | `dcb:blacklist:${string}` | `dcb:service:${string}`;

let client: any = null;

async function createRedisClient(db = 5) {
  if (client?.connected) {
    console.log("Redis Client Already Connected");
    return;
  }
  console.log("Creating Redis Client");
  await new Promise((resolve, reject) => {
    client = createClient({
      db,
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      // url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    })
      .on("connect", () => {
        console.log("Redis Client Connected");
        resolve(client);
      })
      .on("error", (err: any) => {
        console.error("Redis Client Error", err);
        reject(new Error(err));
      });
  });
}

export async function getRedisKey(key: TRedisKey) {
  await createRedisClient();
  const value = await new Promise((resolve, reject) => {
    client.hgetall(key, (err: any, value: any) => {
      if (err) {
        console.error("Error fetching Redis key:", err);
        reject(new Error(err));
      } else {
        resolve(value);
      }
    });
  });
  return value;
}

export async function createRedisKey(key: TRedisKey, value: Record<string, string>) {
  await createRedisClient();
  await client.HMSET(key, value);
}

export async function deleteRedisKey(key: TRedisKey) {
  await createRedisClient();
  await client.DEL(key);
}
