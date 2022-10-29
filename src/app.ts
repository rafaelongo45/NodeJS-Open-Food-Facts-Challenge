import chalk from "chalk";
import dotenv from "dotenv";
import { Db, MongoClient } from "mongodb";

dotenv.config();
let db: Db;
const dbString: string = process.env.DB_CONN_STRING;

try {
  const mongoClient = new MongoClient(dbString);
  await mongoClient.connect();
  db = mongoClient.db(process.env.COLLECTION);
  console.log(
    chalk.bold.blue(
      `Connected to database ${chalk.bold.yellow(process.env.COLLECTION)}`
    )
  );
} catch (e) {
  console.log(chalk.bold.red("Connection to database failed!") + e);
}

export default db;
