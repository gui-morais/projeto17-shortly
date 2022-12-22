import { findShortURL } from "../../repositories/urlRepositories.js";

export async function getShortURL(req,res) {
    try {
        const { shortUrl } = req.params;
        const results = await findShortURL(shortUrl);
        if(results.rows.length === 0) {
            return res.sendStatus(404);
        }

        return res.status(200).send(results.rows[0].url);
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}