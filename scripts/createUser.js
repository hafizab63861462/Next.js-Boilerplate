const bycrypt = require("bcrypt");
const mongodb = require("mongodb");

async function insertAdmin() {
  const client = await mongodb.MongoClient.connect("mongodb://127.0.0.1:27017");
  const db = client.db("yasim");
  const collection = db.collection("users");

  const existingAdmin = await collection.findOne({ email: "admin@gmail.com" });
  if (existingAdmin) {
    console.log("Admin user already exists. No action taken.");
    await client.close();
    return;
  } else {
    const hashedPassword = await bycrypt.hash("admin@123", 10);
    const adminUser = {
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await collection.insertOne(adminUser);
    console.log("Admin user created successfully!");
    await client.close();
  }
}

insertAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
