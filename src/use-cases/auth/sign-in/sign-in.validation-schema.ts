import Joi from "joi";

export const SignInValidationSchema = Joi.object({
    login: Joi.string(),
    password: Joi.string(),
});
