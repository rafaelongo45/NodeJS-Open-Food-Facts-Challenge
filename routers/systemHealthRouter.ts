import { Router } from "express";

const systemHealthRouter = Router();

systemHealthRouter.get("/", async (req, res) => {
  try {
    const systemHealth = process.memoryUsage();
    return res.status(200).send(systemHealth);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

export default systemHealthRouter;
