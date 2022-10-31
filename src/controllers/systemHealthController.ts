import { Request, Response } from "express";

import appStatus from "../services/getAppStatus.js";
import cronRepository from "../repositories/cronRepository.js";

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
  const cronTime = await cronRepository.getLastTime();
  const appInfo = appStatus();
  const systemHealth: SystemHealth = {
    ...appInfo,
    cronTime,
    connection: connectionMessage,
    write: writeMessage,
    read: readMessage,
  };

  try {
    return res.status(200).send(systemHealth);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

const systemHealthController = {
  getSystemHealth,
};

export default systemHealthController;
