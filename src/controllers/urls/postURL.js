import { nanoid } from 'nanoid/async';
import { validateSession } from '../../repositories/sessionRepositories.js';
import { addURL } from '../../repositories/urlRepositories.js';

export default async function postURL(req,res) {
    try{
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');
        const results = await validateSession(token);
        const user_id = results.rows[0].user_id;

        const { url } = req.body;
        const shortUrl = await nanoid();
        const result = addURL(user_id, url, shortUrl);
        if(result) {
            return res.sendStatus(201);
        }
        
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}