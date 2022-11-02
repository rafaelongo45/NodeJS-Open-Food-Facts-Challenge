import fs from "fs";
import axios from "axios";
import dotenv from "dotenv";
import * as cron from "node-cron";

import db from "../app.js";
import { downloadFile, extractFile, insertToDB } from "./filesManager.js";

dotenv.config();

export function cronFunction() {
  const cronTime = process.env.CRON_TIME;
  cron.schedule(
    cronTime,
    async () => {
      await updateDb();
      await saveCronTime();
    },
    { scheduled: true, timezone: "America/Sao_Paulo" }
  );
}

export async function saveCronTime() {
  const cronTime = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
  await db.collection("cron_history").insertOne({ time: cronTime });
}

export async function updateDb() {
  let names;
  try {
    const getNames = await axios.get(
      "https://challenges.coode.sh/food/data/json/index.txt"
    );
    names = getNames.data.trim().split("\n");
    let lastFile = names[names.length - 1];
    let lastFileName = lastFile.replace(".json.gz", ".txt");
    const [lastFileUpdated] = await db
      .collection("filename")
      .find({})
      .limit(1)
      .sort({ _id: -1 })
      .toArray();
    if (lastFileUpdated && lastFileUpdated.name === lastFileName) {
      return console.log("Database is already updated");
    }
    for (let i = 0; i < names.length; i++) {
      await downloadFile(names[i]);
    }
    for (let i = 0; i < names.length; i++) {
      await extractFile(names[i]);
    }

    setTimeout(async () => {
      if (lastFileName) {
        for (let i = 0; i < names.length; i++) {
          const name = names[i].replace(".json.gz", ".txt");
          await insertToDB(name);
          fs.unlinkSync(`src/utils/${name}`);
        }
      }
    }, 60000);
  } catch (e) {
    console.log(e);
  }
}
