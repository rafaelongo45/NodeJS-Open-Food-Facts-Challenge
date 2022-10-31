import { Request, Response } from "express";

import productsService from "../services/productsService.js";

async function getAllProducts(req: Request, res: Response) {
  const page: number = req.query.page as any;
  const skipAmount = (page - 1) * 20;
  const products = await productsService.getProducts(page, skipAmount);
  return res.status(200).send(products);
}

async function getProductByCode(req: Request, res: Response) {
  const { code } = req.params;
  const numericCode = parseFloat(code);
  const isInteger = numericCode % 1 === 0;
  const product = await productsService.getOne(numericCode, isInteger);
  return res.status(200).send(product);
}

async function updateProduct(req: Request, res: Response) {
  const { code } = req.params;
  const body = req.body;
  const numericCode = parseFloat(code);
  const isInteger = numericCode % 1 === 0;
  await productsService.update(numericCode, isInteger, body);
  return res.status(200).send("Updated successfully");
}

async function deleteProduct(req: Request, res: Response) {
  const { code } = req.params;
  const numericCode = parseFloat(code);
  const isInteger = numericCode % 1 === 0;
  await productsService.deleteProduct(numericCode, isInteger);
  return res.status(200).send("Product status changed to trash");
}

const productsController = {
  getAllProducts,
  getProductByCode,
  updateProduct,
  deleteProduct,
};

export default productsController;
