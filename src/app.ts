import dotenv from "dotenv";
import { Db, MongoClient } from "mongodb";

dotenv.config();
let db: Db;
const dbString: string = process.env.DB_CONN_STRING;

try {
  const mongoClient = new MongoClient(dbString);
  await mongoClient.connect();
  db = mongoClient.db(process.env.DATABASE);
  console.log(`Connected to database ${process.env.DATABASE}`);
} catch (e) {
  console.log("Connection to database failed!" + e);
}

export default db;
