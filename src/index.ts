import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";

import systemHealthRouter from "./routers/appHealthRouter.js";
import updateDBRouter from "./routers/updateDBRouter.js";
import productsRouter from "./routers/productsRouter.js";

dotenv.config();

const port = +process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(systemHealthRouter);
app.use(updateDBRouter);
app.use(productsRouter);

app.listen(port, () =>
  console.log(chalk.bold.green(`Server is up and running on port ${port}`))
);
