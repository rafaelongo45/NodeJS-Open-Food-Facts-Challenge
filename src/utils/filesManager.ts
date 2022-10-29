import fs from "fs";
import zlib from "zlib";
import axios from "axios";

import db from "../app.js";

export async function downloadFile() {
  const filename = "products_01.json.gz";
  const fileExists = await db
    .collection("filename")
    .find({ name: filename })
    .toArray();
  let str = "dados ja estavam inseridos";
  if (fileExists.length === 0) {
    const url = `https://challenges.coode.sh/food/data/json/${filename}`;
    const writeStream = fs.createWriteStream(
      "./src/utils/downloads/products_01.gz"
    );
    const promise = axios.get(url, { responseType: "stream" });
    promise.then((response) => {
      response.data.pipe(
        writeStream.on("finish", () => {
          extractFile(filename).then(() =>
            fs.unlinkSync("./src/utils/downloads/products_01.gz")
          );
        })
      );
    });
    str = "dados inseridos";
  }

  checkIfExists();
  return str;
}

async function extractFile(filename) {
  const fileStream = fs.createReadStream(
    "./src/utils/downloads/products_01.gz"
  );
  const unzip = zlib.createGunzip();
  const writeStream = fs.createWriteStream("./src/utils/downloads/file1.txt");
  fileStream
    .pipe(
      unzip.on("data", () => {
        fileStream.close();
      })
    )
    .pipe(writeStream);
}

function callPopulate() {
  const filename = "products_01.json.gz";
  insertToDB(filename);
}

function checkIfExists() {
  const fileExists = fs.existsSync("./src/utils/downloads/file1.txt");
  if (fileExists) {
    callPopulate();
  } else {
    setTimeout(() => checkIfExists(), 3000);
  }
}

async function insertToDB(filename) {
  const arr = [];
  const file = fs
    .readFileSync("src/utils/downloads/file1.txt", "utf8")
    .split(/\r?\n/);
  console.log(file);
  for (let i = 0; i < 100; i++) {
    arr.push(JSON.parse(file[i]));
  }
  const Status = Object.freeze({
    Draft: Symbol("draft"),
    Published: Symbol("published"),
    Trash: Symbol("trash"),
  });

  for (let i = 0; i < arr.length; i++) {
    const dateTime = new Date();
    arr[i].code = arr[i].code.slice(1);
    const objectData = {
      code: parseInt(arr[i].code),
      status: Status.Published,
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

  await db.collection("filename").insertOne({ name: filename });
  fs.unlinkSync("./src/utils/downloads/file1.txt");
  return arr;
}
