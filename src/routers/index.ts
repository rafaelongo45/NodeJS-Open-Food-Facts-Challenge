import { Router } from "express";

import productsRouter from "./productsRouter.js";
import systemHealthRouter from "./appHealthRouter.js";

const router = Router();

router.use(systemHealthRouter);
router.use(productsRouter);

export default router;
