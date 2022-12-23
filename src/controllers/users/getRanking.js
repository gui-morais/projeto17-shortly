import { rankingQuery } from "../../repositories/userRepositories.js";

export async function getRanking(req,res) {
    try {
        const results = await rankingQuery();
        return res.status(200).send(results);
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}