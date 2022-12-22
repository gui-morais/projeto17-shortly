import connection from "../database/db.js";

export async function verifyUser(email) {
    try {
        const results = await connection.query(`SELECT id FROM users WHERE users.email = $1`, [email]);
        return results.rows.length===0;
    } catch (err) {
        console.log(err);
        return null
    }
}

export async function addUser(user) {
    try {
        await connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [user.name, user.email, user.password]);
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}