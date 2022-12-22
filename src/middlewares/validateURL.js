import { urlSchema } from "../models/models.js";

export async function validateURL(req,res,next) {
    const validation = urlSchema.validate(req.body);
    if (validation.error) {
        return res.status(422).send(validation.error.details[0].message);
    }

    next();
}