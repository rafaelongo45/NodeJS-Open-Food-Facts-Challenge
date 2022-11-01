import productsRepository from "../repositories/productsRepository.js";

async function getProducts(page: number, skipAmount: number) {
  let products;
  isPageNumberValid(page);
  page
    ? (products = await productsRepository.getAllProductsWithLimit(skipAmount))
    : (products = await productsRepository.getAllProducts());
  return products;
}

async function getOne(numericCode: number, isInteger: boolean) {
  checkCodeAndInteger(numericCode, isInteger);
  const product = await productsRepository.getSpecificProduct(numericCode);
  checkIfExists(product);
  return product[0];
}

async function update(numericCode: number, isInteger: boolean, body) {
  checkCodeAndInteger(numericCode, isInteger);
  const product = await productsRepository.getSpecificProduct(numericCode);
  checkIfExists(product);
  await productsRepository.updateProduct(numericCode, body);
}

async function deleteProduct(numericCode: number, isInteger: boolean) {
  checkCodeAndInteger(numericCode, isInteger);
  const [product] = await productsRepository.getSpecificProduct(numericCode);
  checkIfExists(product);
  checkIfDeleted(product);
  await productsRepository.deleteProduct(numericCode);
}

function checkCodeAndInteger(numericCode: number, isInteger: boolean) {
  if (!numericCode || !isInteger) {
    throw {
      type: "productError",
      message: "Code is not a number or not an integer",
      code: 400,
    };
  }
}

function checkIfExists(product) {
  if (product.length === 0) {
    throw {
      type: "productError",
      message: "No product with given code",
      code: 404,
    };
  }
}

function checkIfDeleted(product) {
  if (product.status === "trash") {
    throw {
      type: "productError",
      message: "Product was already deleted",
      code: 409,
    };
  }
}

function isPageNumberValid(page: number) {
  if (page <= 0) {
    throw {
      type: "productError",
      message: "Page number can't be equal or less than 0",
      code: 400,
    };
  }
}

const productsService = {
  getProducts,
  getOne,
  update,
  deleteProduct,
};

export default productsService;
