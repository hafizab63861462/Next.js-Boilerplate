import { Db, MongoClient } from 'mongodb';


const client: Record<string, MongoClient | null> = {};

const urlMapping = {
    [process.env.DB_NAME ?? "d"]: process.env.MONGODB_URI?.toString(),
    [process.env.VOUCHER_DB_NAME ?? "v"]: process.env.MONGODB_URI?.toString(),
    [process.env.PGW_DB_NAME ?? "p"]: process.env.MONGO_PAYMENT_GATEWAY_STORES?.toString(),
}

export async function dbConnection(dbName = process.env.DB_NAME ?? "") {
    if ((client as any)?.[dbName]?.topology?.isConnected()) {
        console.log(`Using existing connection against ${dbName}`);
        const db = client[dbName]?.db(dbName);
        return { db, client: client[dbName] } as {
            db: Db;
            client: MongoClient;
        };
    }
    console.log(`Creating new connection ${dbName}`);
    client[dbName] = new MongoClient(urlMapping[dbName] ?? "");
    await client[dbName].connect();
    const db = client[dbName].db(dbName);
    return { db, client };
}