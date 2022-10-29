import axios from "axios";
import { Router } from "express";
import { downloadFile } from "../utils/filesManager.js";

const updateDBRouter = Router();

updateDBRouter.get("/update", async (req, res) => {
  let names;
  try {
    const getNames = await axios.get(
      "https://challenges.coode.sh/food/data/json/index.txt"
    );
    names = getNames.data.trim().split("\n");
    const arrData = await downloadFile();
    return res.status(200).send(arrData);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

export default updateDBRouter;
