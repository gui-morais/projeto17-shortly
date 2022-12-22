import { newUserSchema } from "../models/models.js";
import { verifyUser } from "../repositories/userRepositories.js";

export async function validateNewUser(req,res,next) {
    try {
        const validation = newUserSchema.validate(req.body, { abortEarly: false });
        if (validation.error) {
            const errors = validation.error.details.map((detail) => detail.message);
            return res.status(422).send(errors);
        }

        const verify = await verifyUser(req.body.email);

        if(verify===null) {
            return res.sendStatus(500);
        }

        if(!verify) {
            return res.sendStatus(409);
        }

        next();
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}