import connection from "../database/db.js";
import { v4 as uuid } from 'uuid';

export async function findSession(userId) {
    try {
        return await connection.query(`SELECT * FROM sessions WHERE user_id = $1`, [userId]);
    } catch(err) {
        console.log(err);
        return "erro";
    }
}

export async function validateSession(token) {
    try {
        return await connection.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
    } catch(err) {
        console.log(err);
        return "erro";
    }
}

export async function addSession(userId) {
    try {
        const token = uuid();
        await connection.query(`INSERT INTO sessions (user_id, token) VALUES ($1, $2)`, [userId, token]);
        return token;
    } catch(err) {
        console.log(err);
        return false;
    }
}

export async function updateSession(sessionId) {
    try {
        const token = uuid();
        await connection.query(`UPDATE sessions SET token = $1 WHERE id = $2`, [token, sessionId]);
        return token;
    } catch(err) {
        console.log(err);
        return false;
    }
}