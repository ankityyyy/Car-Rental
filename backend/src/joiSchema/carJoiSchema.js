import Joi from "joi";

export const carAddSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "any.required": "title is required",
    "string.base": "title must be a string"
  }),

  brand: Joi.string().trim().required().messages({
    "any.required": "brand is required",
    "string.base": "brand must be a string"
  }),

  model: Joi.string().trim().required().messages({
    "any.required": "model is required",
    "string.base": "model must be a string"
  }),

  pricingType: Joi.string()
    .valid("perDay", "perKm", "custom")
    .required()
    .messages({
      "any.required": "pricingType is required",
      "any.only": "pricingType must be one of perDay, perKm, or custom"
    }),

  pricePerDay: Joi.number()
    .when("pricingType", {
      is: "perDay",
      then: Joi.required(),
      otherwise: Joi.optional()
    })
    .messages({
      "any.required": "pricePerDay is required when pricingType is perDay",
      "number.base": "pricePerDay must be a number"
    }),

  pricePerKm: Joi.number()
    .when("pricingType", {
      is: "perKm",
      then: Joi.required(),
      otherwise: Joi.optional()
    })
    .messages({
      "any.required": "pricePerKm is required when pricingType is perKm",
      "number.base": "pricePerKm must be a number"
    }),

  customPrice: Joi.number()
    .when("pricingType", {
      is: "custom",
      then: Joi.required(),
      otherwise: Joi.optional()
    })
    .messages({
      "any.required": "customPrice is required when pricingType is custom",
      "number.base": "customPrice must be a number"
    }),

  customDescription: Joi.string()
    .when("pricingType", {
      is: "custom",
      then: Joi.optional(),
      otherwise: Joi.forbidden()
    }),

  availability: Joi.boolean().required().messages({
    "any.required": "availability is required",
    "boolean.base": "availability must be a boolean"
  }),

  seats: Joi.number().required().messages({
    "any.required": "seats is required",
    "number.base": "seats must be a number"
  }),

  fuelType: Joi.string()
    .valid("petrol", "diesel", "electric")
    .required()
    .messages({
      "any.required": "fuelType is required",
      "any.only": "fuelType must be one of petrol, diesel, or electric"
    }),

  transmission: Joi.string()
    .valid("manual", "automatic")
    .required()
    .messages({
      "any.required": "transmission is required",
      "any.only": "transmission must be one of manual or automatic"
    }),

  coordinates: Joi.array()
    .items(Joi.number().required())
    .length(2)
    .required()
    .messages({
      "any.required": "coordinates are required",
      "array.base": "coordinates must be an array of two numbers",
      "array.length": "coordinates must have exactly 2 items"
    }),

  address: Joi.string().required().messages({
    "any.required": "address is required",
    "string.base": "address must be a string"
  }),

  city: Joi.string().required().messages({
    "any.required": "city is required",
    "string.base": "city must be a string"
  }),

  state: Joi.string().required().messages({
    "any.required": "state is required",
    "string.base": "state must be a string"
  }),

  country: Joi.string().required().messages({
    "any.required": "country is required",
    "string.base": "country must be a string"
  }),

  image: Joi.object({
  filename: Joi.string().optional(),
  url: Joi.string().uri().required().messages({
    "any.required": "image URL is required",
    "string.uri": "image URL must be a valid URI",
  }),
}).required().messages({
  "any.required": "image field is required",
  "object.base": "image must be an object with filename and url",
}),

});
