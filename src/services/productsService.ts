import productsRepository from "../repositories/productsRepositor.js";

async function getProducts(page: number, skipAmount: number) {
  let products;
  if (page <= 0) {
    throw {
      type: "productError",
      message: "Page number can't be equal or less than 0",
      code: 400,
    };
  }
  page
    ? (products = await productsRepository.getAllProductsWithLimit(skipAmount))
    : (products = await productsRepository.getAllProducts());
  return products;
}

async function getOne(numericCode: number, isInteger: boolean) {
  if (!numericCode || !isInteger) {
    throw {
      type: "productError",
      message: "Code is not a number or not an integer",
      code: 400,
    };
  }

  const [product] = await productsRepository.getSpecificProduct(numericCode);
  if (!product) {
    throw {
      type: "productError",
      message: "No product with given code",
      code: 404,
    };
  }

  return product;
}

async function update(numericCode: number, isInteger: boolean, body) {
  if (!numericCode || !isInteger) {
    throw {
      type: "productError",
      message: "Code is not a number or not an integer",
      code: 400,
    };
  }

  const [product] = await productsRepository.getSpecificProduct(numericCode);
  if (!product) {
    throw {
      type: "productError",
      message: "No product with given code",
      code: 404,
    };
  }
  await productsRepository.updateProduct(numericCode, product, body);
}

async function deleteProduct(numericCode, isInteger){
  if (!numericCode || !isInteger) {
    throw {
      type: "productError",
      message: "Code is not a number or not an integer",
      code: 400,
    };
  }

  const [product] = await productsRepository.getSpecificProduct(numericCode);

  if (!product) {
    throw {
      type: "productError",
      message: "No product with given code",
      code: 404,
    };
  }

  if (product.status === "trash") {
    throw {
      type: "productError",
      message: "Product was already deleted",
      code: 409,
    };
  }
  await productsRepository.deleteProduct(numericCode);
}

const productsService = {
  getProducts,
  getOne,
  update,
  deleteProduct
};

export default productsService;
