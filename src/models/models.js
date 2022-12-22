import joi from "joi";

export const newUserSchema = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.ref("password")
});

export const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
});

export const urlSchema = joi.object({
    url: joi.string().uri().required()
});