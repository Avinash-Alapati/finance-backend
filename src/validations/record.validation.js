import Joi from "joi";

export const recordSchema = Joi.object({
  amount: Joi.number().positive().required(),
  type: Joi.string().valid("income", "expense").required(),
  category: Joi.string().required(),
  date: Joi.date().required(),
  notes: Joi.string().allow(""),
});