import { validateSession } from "../../repositories/sessionRepositories.js";
import { findURLSbyUser } from "../../repositories/urlRepositories.js";
import { findUserByID } from "../../repositories/userRepositories.js";

export async function getUser(req, res) {
    try{
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');
        const results = await validateSession(token);
        const user_id = results.rows[0].user_id;
        const user = await findUserByID(user_id);
        if(user.rows.length===0) {
            return res.sendStatus(404);
        }

        const shortenedUrls = await findURLSbyUser(user_id);
        
        let visitCount = 0;
        
        shortenedUrls.rows.map(e => visitCount+=e.visitCount);
        return res.status(200).send({...user.rows[0], visitCount, shortenedUrls: shortenedUrls.rows});
        

    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}