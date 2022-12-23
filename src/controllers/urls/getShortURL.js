import { findShortURL, incrementVisitCount } from "../../repositories/urlRepositories.js";

export async function getShortURL(req,res) {
    try {
        const { shortUrl } = req.params;
        const results = await findShortURL(shortUrl);
        if(results.rows.length === 0) {
            return res.sendStatus(404);
        }
        await incrementVisitCount(shortUrl, results.rows[0].visitCount+1);
        return res.status(200).redirect(results.rows[0].url);
        // return res.status(200).send(results.rows[0].url);
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}