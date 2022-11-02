import fs from "fs";
import zlib from "zlib";
import axios from "axios";
import * as fsp from "fs/promises";

import db from "../app.js";

export async function downloadFile(filename) {
  const url = `https://challenges.coode.sh/food/data/json/${filename}`;
  try {
    const writeStream = fs.createWriteStream(`./src/utils/${filename}`);
    await axios.get(url, { responseType: "stream" }).then((response) => {
      response.data.pipe(writeStream);
    });
  } catch (e) {
    console.log(e);
  }
}

export async function extractFile(filename: string) {
  const name = filename.replace(".json.gz", ".txt");
  const file = await fsp.readFile(`./src/utils/${filename}`);
  const unzipStream = zlib.createUnzip();
  let bufferString = "";
  let sum = 0;
  unzipStream.write(file);
  unzipStream.on("data", (chunk) => {
    bufferString += chunk.toString();
    if (bufferString.indexOf("\n") > 0) sum++;
    if (sum > 50) unzipStream.emit("end");
  });
  unzipStream.on("end", async () => {
    unzipStream.destroy();
    await fsp.writeFile(`./src/utils/${name}`, bufferString);
    fs.unlink(`./src/utils/${filename}`, (err) => console.log(err));
  });
}

export async function insertToDB(name) {
  const arr = [];
  const file = fs.readFileSync(`src/utils/${name}`, "utf8").split(/\r?\n/);
  for (let i = 0; i < 100; i++) {
    arr.push(JSON.parse(file[i]));
  }

  const dateTime = new Date();
  for (let i = 0; i < arr.length; i++) {
    arr[i].code = arr[i].code.slice(1);

    const objectData = {
      code: parseInt(arr[i].code),
      status: "published",
      imported_t: dateTime.toISOString(),
      url: arr[i].url,
      creator: arr[i].creator,
      created_t: arr[i].created_t,
      last_modified_t: arr[i].last_modified_t,
      product_name: arr[i].product_name,
      quantity: arr[i].quantity,
      brands: arr[i].brands,
      categories: arr[i].categories,
      labels: arr[i].labels,
      cities: arr[i].cities,
      purchase_places: arr[i].purchase_places,
      stores: arr[i].stores,
      ingredients_text: arr[i].ingredients_text,
      traces: arr[i].traces,
      serving_size: arr[i].serving_size,
      serving_quantity: arr[i].serving_quantity,
      nutriscore_score: arr[i].nutriscore_score,
      nutriscore_grade: arr[i].nutriscore_grade,
      main_category: arr[i].main_category,
      image_url: arr[i].image_url,
    };

    await db.collection("products").insertOne(objectData);
  }

  await db.collection("filename").insertOne({ name: name });
}
