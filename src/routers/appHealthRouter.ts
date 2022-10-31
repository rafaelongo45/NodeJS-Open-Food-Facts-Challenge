import { Router } from "express";

import readStatus from "../middlewares/readStatus.js";
import writeStatus from "../middlewares/writeStatus.js";
import checkDBCon from "../middlewares/mongoConnection.js";
import systemHealthController from "../controllers/systemHealthController.js";

const appHealthRouter = Router();

appHealthRouter.get(
  "/",
  checkDBCon,
  writeStatus,
  readStatus,
  systemHealthController.getSystemHealth
);

export default appHealthRouter;
