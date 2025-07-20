import Joi from 'joi';

export const reviewJoiSchema=Joi.object({
     review:Joi.string().max(300).required().messages({
    "any.required": "review is required",
    "string.base": "review must be a string",
    "string.max": "Review cannot exceed 300 characters"
  }),

  rating:Joi.number().min(1).max(5).required().messages({
    "any.required": "rating is required",
    "number.base": "rating must be a number",
    "number.min": "Rating must be at least 1",
  "number.max": "Rating must be at most 5"
  }),

})

export const updateReviewJoiSchema = Joi.object({
  review: Joi.string().messages({
    "string.base": "Review must be a string"
  }),

  rating: Joi.number().min(1).max(5).messages({
    "number.base": "Rating must be a number",
    "number.min": "Rating must be at least 1",
    "number.max": "Rating must be at most 5"
  })
});
