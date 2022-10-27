import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";

import systemHealthRouter from "../routers/systemHealthRouter.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(systemHealthRouter);

app.listen(port, () =>
  console.log(chalk.bold.green("Server is up and running!"))
);
