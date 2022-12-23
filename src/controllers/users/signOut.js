import { deleteSession } from "../../repositories/sessionRepositories.js";

export async function signOut(req,res) {
    try{
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');
        await deleteSession(token);
        return res.sendStatus(204);
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}