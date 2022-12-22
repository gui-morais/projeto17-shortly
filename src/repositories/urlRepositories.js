import connection from "../database/db.js";

export async function addURL(user_id, url, shortUrl) {
    try {
        await connection.query(`INSERT INTO links (user_id, url, "shortUrl") VALUES ($1, $2, $3)`, [user_id, url, shortUrl]);
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}