import dotenv from "dotenv";
import express from "express";
import "express-async-errors";

import router from "./routers/index.js";
import { cronFunction } from "./utils/updateDatabase.js";
import { errorHandler } from "./middlewares/handleError.js";

dotenv.config();
const port = +process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  cronFunction();
  console.log(`Server is up and running on port ${port}`);
});
