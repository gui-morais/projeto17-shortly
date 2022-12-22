import bcrypt from 'bcrypt';
import { userSchema } from "../models/models.js";
import { findUser } from "../repositories/userRepositories.js";

export async function validateUser(req,res,next) {
    try{
        const validation = userSchema.validate(req.body, { abortEarly: false });
        if (validation.error) {
            const errors = validation.error.details.map((detail) => detail.message);
            return res.status(422).send(errors);
        }

        const verifyUser = await findUser(req.body.email);
        if(verifyUser.rows.length===0) {
            return res.sendStatus(401);
        }

        const user = verifyUser.rows[0];
        if(!bcrypt.compareSync(req.body.password, user.password)) {
            return res.sendStatus(401);
        } else {
            next();
        }
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}