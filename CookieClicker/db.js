const mariadb = require('mariadb');

const pool = mariadb.createPool({host: '127.0.0.1', user: 'root', connectionLimit: 5});

async function createUser(name, passwordHash) {
    let conn;

    try {
        conn = await pool.getConnection();
    } catch (e) {
        throw (e)
    } finally {
        if (conn) conn.release();
    }
}

async function userExists(name) {
    let conn;

    try {
        conn = await pool.getConnection();

        const res = conn.query('SELECT COUNT(username) FROM users WHERE username=?')

    } catch (e) {
        throw (e)
    } finally {
        if (conn) conn.release();
    }
}

module.exports = { createUser }