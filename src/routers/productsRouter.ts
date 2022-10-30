import { Router } from "express";

import db from "../app.js";

const productsRouter = Router();

productsRouter.get("/products", async (req, res) => {
  const page: number = req.query.page as any;
  if (page) {
    if (page <= 0) throw new Error("Page number can't be equal or less than 0");
    let skipAmount = (page - 1) * 20;
    const data = await db
      .collection("products")
      .find({})
      .skip(skipAmount)
      .limit(20)
      .toArray();
    console.log(data.length);
    return res.status(200).send(data);
  }
  const data = await db.collection("products").find({}).toArray();
  return res.status(200).send(data);
});

productsRouter.get("/products/:code", async (req, res) => {
  const { code } = req.params;
  const data = await db
    .collection("products")
    .find({ code: parseInt(code) })
    .toArray();
  return res.status(200).send(data);
});

productsRouter.delete("/products/:code", async (req, res) => {
  const { code } = req.params;

  await db
    .collection("products")
    .updateOne({ code: parseInt(code) }, { $set: { status: "trash" } });
  return res.status(200).send("Product status changed to trash");
});

export default productsRouter;
