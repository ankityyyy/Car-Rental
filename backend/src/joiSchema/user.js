import Joi from "joi";

export const userSchemaReigster = Joi.object({
  name: Joi.string().trim().required().messages({
    "any.required": "Name is required",
    "string.base": "Name must be a string"
  }),

  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Must be a valid email"
  }),

  password: Joi.string().min(6).required().messages({
    "any.required": "Password is required",
    "string.min": "Password must be at least 6 characters"
  }),

  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be exactly 10 digits",
      "any.required": "Phone number is required"
    }),

  role: Joi.string().valid("admin", "owner", "customer").required().messages({
    "any.required": "Role is required",
    "any.only": "Role must be one of admin, owner, or customer"
  })
});

export  const userSchemaLogin = Joi.object({
     email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Must be a valid email"
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Password is required",
    "string.min": "Password must be at least 6 characters"
  }),

})