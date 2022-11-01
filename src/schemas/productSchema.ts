import joi from "joi";

const productSchema = joi.object({
  quantity: joi.string(),
  brands: joi.string(),
  categories: joi.string(),
  labels: joi.string(),
  cities: joi.string(),
  purchase_places: joi.string(),
  stores: joi.string(),
  ingredients_text: joi.string(),
  traces: joi.string(),
  serving_size: joi.string(),
  serving_quantity: joi.number(),
  nutriscore_score: joi.number(),
  nutriscore_grade: joi.string(),
  main_category: joi.string(),
});

export default productSchema;
