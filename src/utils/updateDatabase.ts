import fs from "fs";
import axios from "axios";
import * as cron from "node-cron";

import db from "../app.js";
import { downloadFile, extractFile, insertToDB } from "./filesManager.js";

export function cronFunction() {
  cron.schedule(
    "0 20 17 * * *",
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
          fs.unlinkSync(`src/utils/downloads/${names[i]}`);
          fs.unlinkSync(`src/utils/downloads/${name}`);
        }
      }
    }, 10000);
  } catch (e) {
    console.log(e);
  }
}
