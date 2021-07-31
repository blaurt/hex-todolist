import * as Joi from "joi";

export const SignUpValidationSchema = Joi.object({
    //     login: Joi.string().required(),
    //     password: Joi.string().required(),
    //     repeatPassword: Joi.string().required(),
    //     email: Joi.string().email().required(),
    level: Joi.object({
        one: Joi.string().required(),
    }).required(),
});
