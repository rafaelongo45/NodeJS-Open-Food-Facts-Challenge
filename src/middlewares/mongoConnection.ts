import { NextFunction, Request, Response } from "express";

import db from "../app.js";

async function checkDBCon(req: Request, res: Response, next: NextFunction) {
  let connectionMessage: string;
  try {
    await db.command({ ping: 1 });
    connectionMessage = "Ok";
  } catch (e) {
    console.log(e);
    connectionMessage = "Failed";
  } finally {
    res.locals.connectionMessage = connectionMessage;
    next();
  }
}

export default checkDBCon;
