import { newUserSchema } from "../models/models.js";
import { findUser } from "../repositories/userRepositories.js";

export async function validateNewUser(req,res,next) {
    try {
        const validation = newUserSchema.validate(req.body, { abortEarly: false });
        if (validation.error) {
            const errors = validation.error.details.map((detail) => detail.message);
            return res.status(422).send(errors);
        }

        const verifyUser = await findUser(req.body.email);

        if(verifyUser===null) {
            return res.sendStatus(500);
        }

        if(verifyUser.rows.length!==0) {
            return res.sendStatus(409);
        }

        next();
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}