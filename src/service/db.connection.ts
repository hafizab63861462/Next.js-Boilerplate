import { Db, MongoClient } from "mongodb";
let client: MongoClient | null = null;
export async function dbConnection(dbName: string) {
  if ((client as any)?.topology?.isConnected()) {
    console.log("Using existing connection");
    const db = client?.db(dbName);
    return { db, client } as {
      db: Db;
      client: MongoClient;
    };
  }
  console.log("Creating new connection");
  client = new MongoClient(
    process.env.MONGODB_URI?.toString() ?? "mongodb://127.0.0.1:27017"
  );
  await client.connect();
  const db = client.db(dbName);
  return { db, client };
}
