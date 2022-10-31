import { Request, Response } from "express";
import db from "../app.js";

import appStatus from "../services/getAppStatus.js";

interface SystemHealth {
  uptime: string;
  memoryUsage: NodeJS.MemoryUsage;
  connection: string;
  write: string;
  read: string;
  cronTime: string;
}

async function getSystemHealth(req: Request, res: Response) {
  const { writeMessage, readMessage, connectionMessage } = res.locals;
  const time = await getCronTime();
  const appInfo = appStatus();
  const systemHealth: SystemHealth = {
    ...appInfo,
    connection: connectionMessage,
    write: writeMessage,
    read: readMessage,
    cronTime: time,
  };

  try {
    return res.status(200).send(systemHealth);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

async function getCronTime() {
  try {
    const time = await db
      .collection("cron_history")
      .find({})
      .sort({ time: -1 })
      .limit(1)
      .toArray();
    return time[0].time;
  } catch (e) {
    console.log(e);
  }
}

export default getSystemHealth;
