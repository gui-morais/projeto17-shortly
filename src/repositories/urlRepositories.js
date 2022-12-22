import connection from "../database/db.js";

export async function addURL(user_id, url, shortUrl) {
    try {
        await connection.query(`INSERT INTO links (user_id, url, "shortUrl") VALUES ($1, $2, $3);`, [user_id, url, shortUrl]);
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}

export async function findURL(url_id) {
    try {
        return await connection.query(`SELECT id, user_id, "shortUrl", url FROM links WHERE id = $1;`, [url_id]);
    } catch(err) {
        console.log(err);
        return false;
    }
}

export async function findShortURL(shortUrl) {
    try {
        return await connection.query(`SELECT * FROM links WHERE "shortUrl" = $1;`, [shortUrl]);
    } catch(err) {
        console.log(err);
        return false;
    }
}

export async function incrementVisitCount(shortUrl, newCount) {
    try {
        return await connection.query(`UPDATE links SET "visitCount" = $1 WHERE "shortUrl" = $2;`, [newCount, shortUrl]);
    } catch(err) {
        console.log(err);
        return false;
    }
}

export async function delURL(url_id) {
    try {
        await connection.query(`DELETE FROM links WHERE id = $1;`, [url_id]);
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}

export async function findURLSbyUser(user_id) {
    try {
        return await connection.query(`SELECT links.id, links."shortUrl", links.url, links."visitCount" FROM links JOIN users ON links.user_id = users.id WHERE users.id = $1;`, [user_id]);
    } catch(err) {
        console.log(err);
        return false;
    }
}