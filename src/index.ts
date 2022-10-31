import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";

import systemHealthRouter from "./routers/appHealthRouter.js";
import productsRouter from "./routers/productsRouter.js";
import { cronFunction } from "./utils/updateDatabase.js";

dotenv.config();

const port = +process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(systemHealthRouter);
app.use(productsRouter);

app.listen(port, () => {
  cronFunction();
  console.log(chalk.bold.green(`Server is up and running on port ${port}`));
});
