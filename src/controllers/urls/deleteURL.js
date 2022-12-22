import { validateSession } from "../../repositories/sessionRepositories.js";
import { delURL, findURL } from "../../repositories/urlRepositories.js";

export async function deleteURL(req, res) {
    try {
        const { id } = req.params;
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');
        const results = await validateSession(token);
        const user_id = results.rows[0].user_id;

        const result = await findURL(id);
        if(result.rows.length===0) {
            return res.sendStatus(404);
        }
        const url = result.rows[0];
        if(url.user_id!==user_id) {
            return res.sendStatus(401);
        }

        await delURL(id);
        return res.sendStatus(204);
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}