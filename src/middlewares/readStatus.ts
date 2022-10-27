import { NextFunction, Request, Response } from "express";

import db from "../app.js";

async function readStatus(req: Request, res: Response, next: NextFunction) {
  const { testData } = res.locals;
  let readMessage: string;
  try {
    await db.collection("health_check").find(testData).toArray();
    readMessage = "Ok";
  } catch (e) {
    console.log(e);
    readMessage = "Failed";
  } finally {
    await db.collection("health_check").deleteMany(testData);
    res.locals.readMessage = readMessage;
    next();
  }
}

export default readStatus;
