import { findURL } from "../../repositories/urlRepositories.js";

export async function getURL(req,res) {
    try {
        const { id } = req.params;
        const results = await findURL(Number(id));
        if(results.rows.length === 0) {
            return res.sendStatus(404);
        }
    
        return res.status(200).send(results.rows[0]);
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}