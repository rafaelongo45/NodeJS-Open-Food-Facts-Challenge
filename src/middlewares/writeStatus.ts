import { NextFunction, Request, Response } from "express";

import db from "../app.js";

async function writeStatus(req: Request, res: Response, next: NextFunction) {
  let writeMessage: string;
  const testData = {
    id: -123,
  };

  try {
    await db.collection("health_check").insertOne(testData);
    writeMessage = "Ok";
  } catch (e) {
    console.log(e);
    writeMessage = "Failed";
  } finally {
    res.locals.writeMessage = writeMessage;
    res.locals.testData = testData;
    next();
  }
}

export default writeStatus;
