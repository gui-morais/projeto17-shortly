import { validateSession } from "../repositories/sessionRepositories.js";

export async function validateAuthorization(req,res,next) {
    try{
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');

        const results = await validateSession(token);
        if(results.rows.length === 0) {
            return res.sendStatus(401);
        }

        next();
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}