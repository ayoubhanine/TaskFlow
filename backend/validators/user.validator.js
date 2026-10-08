import Joi from "joi";

export const updateUserSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(2)
    .max(50),

  lastName: Joi.string()
    .trim()
    .min(2)
    .max(50),

  email: Joi.string()
    .email(),

  role: Joi.string()
    .valid("admin", "manager", "member"),
}).min(1);