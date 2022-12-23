import connection from "../database/db.js";

export async function findUser(email) {
    try {
        return await connection.query(`SELECT * FROM users WHERE users.email = $1;`, [email]);
    } catch (err) {
        console.log(err);
        return null
    }
}

export async function findUserByID(id) {
    try{
        return await connection.query(`SELECT id, name FROM users WHERE id = $1;`, [id]);
    } catch (err) {
        console.log(err);
        return null
    }
}

export async function addUser(user) {
    try {
        await connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [user.name, user.email, user.password]);
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}

export async function rankingQuery() {
    try {
        const ranking = await connection.query(`SELECT users.id, users.name, COUNT(links.id) AS "linksCount", SUM(links."visitCount") AS "visitCount" FROM users LEFT JOIN links ON users.id = links.user_id GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10;`);
        const notNull = [];
        const isNull = [];
        ranking.rows.map(e => {
            if(e.visitCount === null) {
                e.visitCount = '0';
                isNull.push(e);
            } else {
                notNull.push(e);
            }
        });
        const results = [];
        notNull.map(e => results.push(e));
        isNull.map(e => results.push(e));
        return results;
    } catch(err) {
        console.log(err);
        return false;
    }
}