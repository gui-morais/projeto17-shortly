import { addSession, findSession, updateSession } from "../../repositories/sessionRepositories.js";
import { findUser } from "../../repositories/userRepositories.js";

export async function signIn(req,res) {
    try {
        const resultsUser = await findUser(req.body.email);
        const user = resultsUser.rows[0];
        const resultsSessions = await findSession(user.id);
        
        if(resultsSessions.rows.length===0) {
            const token = await addSession(user.id);
            if(token!=="erro") {
                return res.status(200).send(token);
            }
        } else {
            const token = await updateSession(resultsSessions.rows[0].id);
            if(token!=="erro") {
                return res.status(200).send(token);
            }
        }
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}