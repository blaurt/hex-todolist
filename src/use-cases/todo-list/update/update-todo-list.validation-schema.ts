import * as Joi from "joi";

export const UpdateTodoListValidationSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    isPrivate: Joi.boolean().required(),
});
