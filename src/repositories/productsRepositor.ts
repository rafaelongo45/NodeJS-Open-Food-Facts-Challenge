import db from "../app.js";

async function getAllProducts() {
  const products = await db.collection("products").find({}).toArray();
  return products;
}

async function getAllProductsWithLimit(skipAmount: number) {
  const products = await db
    .collection("products")
    .find({})
    .skip(skipAmount)
    .limit(20)
    .toArray();

  return products;
}

async function getSpecificProduct(code: number) {
  const product = await db
    .collection("products")
    .find({ code })
    .toArray();

  return product;
}

async function updateProduct(code: number, product, body) {
  await db
    .collection("products")
    .updateOne({ code }, { $set: { ...body } });
}

async function deleteProduct(code: number) {
  await db
    .collection("products")
    .updateOne({ code }, { $set: { status: "trash" } });
}

const productsRepository = {
  getAllProducts,
  getAllProductsWithLimit,
  getSpecificProduct,
  updateProduct,
  deleteProduct
};

export default productsRepository;
