import { jest } from "@jest/globals";

import productsService from "../../src/services/productsService.js";
import productsRepository from "../../src/repositories/productsRepository.js";

describe("Products unit test suite", () => {
  const products = [
    {
      _id: "63618dca5ae885a95f07d9ae",
      code: 17,
      status: "trash",
      imported_t: "2022-11-01T21:21:14.031Z",
      url: "http://world-en.openfoodfacts.org/product/0000000000017/vitoria-crackers",
      creator: "kiliweb",
      created_t: "1529059080",
      last_modified_t: "1561463718",
      product_name: "Vitória crackers",
      quantity: "",
      brands: "",
      categories: "",
      labels: "",
      cities: "Rio de janeiro",
      purchase_places: "",
      stores: "",
      ingredients_text: "",
      traces: "",
      serving_size: "",
      serving_quantity: "",
      nutriscore_score: "",
      nutriscore_grade: "",
      main_category: "",
      image_url:
        "https://static.openfoodfacts.org/images/products/000/000/000/0017/front_fr.4.400.jpg",
    },
    {
      _id: "63618dca5ae885a95f07d9af",
      code: 31,
      status: "published",
      imported_t: "2022-11-01T21:21:14.031Z",
      url: "http://world-en.openfoodfacts.org/product/0000000000031/cacao",
      creator: "isagoofy",
      created_t: "1539464774",
      last_modified_t: "1539464817",
      product_name: "Cacao",
      quantity: "130 g",
      brands: "",
      categories: "",
      labels: "",
      cities: "",
      purchase_places: "",
      stores: "",
      ingredients_text: "",
      traces: "",
      serving_size: "",
      serving_quantity: "",
      nutriscore_score: "",
      nutriscore_grade: "",
      main_category: "",
      image_url:
        "https://static.openfoodfacts.org/images/products/000/000/000/0031/front_fr.3.400.jpg",
    },
  ];

  const specificProduct = [
    {
      _id: "63615a0331b1d617ded237fd",
      code: 17,
      status: "published",
      imported_t: "2022-11-01T17:40:19.431Z",
      url: "http://world-en.openfoodfacts.org/product/0000000000017/vitoria-crackers",
      creator: "kiliweb",
      created_t: "1529059080",
      last_modified_t: "1561463718",
      product_name: "Vitória crackers",
      quantity: "",
      brands: "",
      categories: "",
      labels: "",
      cities: "",
      purchase_places: "",
      stores: "",
      ingredients_text: "",
      traces: "",
      serving_size: "",
      serving_quantity: "",
      nutriscore_score: "",
      nutriscore_grade: "",
      main_category: "",
      image_url:
        "https://static.openfoodfacts.org/images/products/000/000/000/0017/front_fr.4.400.jpg",
    },
  ];
  it("Fails to get products from database", async () => {
    const page = 0;
    const skipAmount = 20;
    const getProductsFunction = productsService.getProducts(page, skipAmount);
    expect(getProductsFunction).rejects.toEqual({
      type: "productError",
      message: "Page number can't be equal or less than 0",
      code: 400,
    });
  });

  it("Gets products from database", async () => {
    const page = undefined;
    const skipAmount = 20;
    jest
      .spyOn(productsRepository, "getAllProducts")
      .mockImplementation((): any => {
        return products;
      });
    const getProductsFunction = await productsService.getProducts(
      page,
      skipAmount
    );

    expect(getProductsFunction).toEqual(products);
  });

  it("Gets first page of products from database", async () => {
    const page = 1;
    const skipAmount = 20;
    jest
      .spyOn(productsRepository, "getAllProductsWithLimit")
      .mockImplementation((): any => {
        return products;
      });
    const getProductsFunction = await productsService.getProducts(
      page,
      skipAmount
    );

    expect(getProductsFunction).toEqual(products);
  });

  it("Get product registered on the database given a code", async () => {
    const productCode = 17;
    const isInteger = true;
    jest
      .spyOn(productsRepository, "getSpecificProduct")
      .mockImplementation((): any => {
        return specificProduct;
      });
    const productDb = await productsService.getOne(productCode, isInteger);
    expect(productDb).toBe(specificProduct[0]);
  });

  it("Tries to get a product with a code and receives error for not sending an integer", async () => {
    const productCode = 17;
    const isInteger = false;
    jest
      .spyOn(productsRepository, "getSpecificProduct")
      .mockImplementation((): any => {});
    const productDb = productsService.getOne(productCode, isInteger);
    expect(productDb).rejects.toEqual({
      type: "productError",
      message: "Code is not a number or not an integer",
      code: 400,
    });
  });

  it("Tries to get a product with a code that doesn't exist and receives error", async () => {
    const productCode = -1;
    const isInteger = true;
    jest
      .spyOn(productsRepository, "getSpecificProduct")
      .mockImplementation((): any => {
        return [];
      });
    const productDb = productsService.getOne(productCode, isInteger);
    expect(productDb).rejects.toEqual({
      type: "productError",
      message: "No product with given code",
      code: 404,
    });
  });

  it("Updates a product in the database", async () => {
    const productCode = 17;
    const isInteger = true;
    jest
      .spyOn(productsRepository, "getSpecificProduct")
      .mockImplementation((): any => {
        return specificProduct;
      });
    jest
      .spyOn(productsRepository, "updateProduct")
      .mockImplementation((): any => {});
    await productsService.update(productCode, isInteger, specificProduct);
    expect(productsRepository.updateProduct).toHaveBeenCalled();
  });

  it("Deletes a product in the database", async () => {
    const productData = [
      {
        _id: "63615a0331b1d617ded237fd",
        code: 17,
        status: "published",
        imported_t: "2022-11-01T17:40:19.431Z",
        url: "http://world-en.openfoodfacts.org/product/0000000000017/vitoria-crackers",
        creator: "kiliweb",
        created_t: "1529059080",
        last_modified_t: "1561463718",
        product_name: "Vitória crackers",
        quantity: "",
        brands: "",
        categories: "",
        labels: "",
        cities: "",
        purchase_places: "",
        stores: "",
        ingredients_text: "",
        traces: "",
        serving_size: "",
        serving_quantity: "",
        nutriscore_score: "",
        nutriscore_grade: "",
        main_category: "",
        image_url:
          "https://static.openfoodfacts.org/images/products/000/000/000/0017/front_fr.4.400.jpg",
      },
    ];
    const productCode = 17;
    const isInteger = true;
    jest
      .spyOn(productsRepository, "getSpecificProduct")
      .mockImplementation((): any => {
        return productData;
      });
    jest
      .spyOn(productsRepository, "deleteProduct")
      .mockImplementation((): any => {});
    await productsService.deleteProduct(productCode, isInteger);
    expect(productsRepository.deleteProduct).toHaveBeenCalled();
  });

  it("Tries to delete a product, receives error", async () => {
    const productData = [
      {
        _id: "63615a0331b1d617ded237fd",
        code: 17,
        status: "trash",
        imported_t: "2022-11-01T17:40:19.431Z",
        url: "http://world-en.openfoodfacts.org/product/0000000000017/vitoria-crackers",
        creator: "kiliweb",
        created_t: "1529059080",
        last_modified_t: "1561463718",
        product_name: "Vitória crackers",
        quantity: "",
        brands: "",
        categories: "",
        labels: "",
        cities: "",
        purchase_places: "",
        stores: "",
        ingredients_text: "",
        traces: "",
        serving_size: "",
        serving_quantity: "",
        nutriscore_score: "",
        nutriscore_grade: "",
        main_category: "",
        image_url:
          "https://static.openfoodfacts.org/images/products/000/000/000/0017/front_fr.4.400.jpg",
      },
    ];
    const productCode = 17;
    const isInteger = true;
    jest
      .spyOn(productsRepository, "getSpecificProduct")
      .mockImplementation((): any => {
        return productData;
      });
    jest
      .spyOn(productsRepository, "deleteProduct")
      .mockImplementation((): any => {});
    const deleteFunction = productsService.deleteProduct(
      productCode,
      isInteger
    );
    expect(deleteFunction).rejects.toEqual({
      type: "productError",
      message: "Product was already deleted",
      code: 409,
    });
  });
});
