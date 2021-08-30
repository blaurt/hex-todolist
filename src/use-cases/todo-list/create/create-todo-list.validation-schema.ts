import * as Joi from "joi";

export const CreateTodoListValidationSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    isPrivate: Joi.boolean().required(),
});
