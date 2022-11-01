import { Router } from "express";

import productSchema from "../schemas/productSchema.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import productsController from "../controllers/productsController.js";

const productsRouter = Router();

productsRouter.get("/products", productsController.getAllProducts);
productsRouter.get("/products/:code", productsController.getProductByCode);
productsRouter.put("/products/:code", validateSchema(productSchema), productsController.updateProduct);
productsRouter.delete("/products/:code", productsController.deleteProduct);

export default productsRouter;