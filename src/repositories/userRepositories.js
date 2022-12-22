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