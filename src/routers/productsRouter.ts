import { Router } from "express";

import productsController from "../controllers/productsController.js";

const productsRouter = Router();

productsRouter.get("/products", productsController.getAllProducts);
productsRouter.get("/products/:code", productsController.getProductByCode);
productsRouter.put("/products/:code", productsController.updateProduct);
productsRouter.delete("/products/:code", productsController.deleteProduct);

export default productsRouter;