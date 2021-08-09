import * as Joi from "joi";

export const CreateTodoListValidationSchema = Joi.object({
    login: Joi.string(),
    password: Joi.string(),
});
