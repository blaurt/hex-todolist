import Joi from "joi";

export const SignUpValidationSchema = Joi.object({
    login: Joi.string(),
    password: Joi.string(),
    repeatPassword: Joi.string(),
    email: Joi.string().email(),
});
