import { Router } from "express";

import readStatus from "../middlewares/readStatus.js";
import writeStatus from "../middlewares/writeStatus.js";
import checkDBCon from "../middlewares/mongoConnection.js";
import getSystemHealth from "../controllers/getSystemHealth.js";

const appHealthRouter = Router();

appHealthRouter.get("/", checkDBCon, writeStatus, readStatus, getSystemHealth);

export default appHealthRouter;
