import Joi from "joi";

export const createTaskSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),

  description: Joi.string()
    .trim()
    .max(1000)
    .allow(""),

  status: Joi.string()
    .valid("todo", "in-progress", "done")
    .default("todo"),

  priority: Joi.string()
    .valid("low", "medium", "high")
    .default("medium"),

  dueDate: Joi.date()
    .iso()
    .allow(null),

  project: Joi.string()
    .required(),

  assignedTo: Joi.string()
    .allow(null, ""),
});