const mariadb = require('mariadb');

const pool = mariadb.createPool({host: '127.0.0.1', user: 'admin', password: 'password', database: 'cookieclicker', connectionLimit: 5});

async function createUser(name, passwordHash) {
    let conn;

    try {
        conn = await pool.getConnection();

        const res = await conn.query('INSERT INTO users (name, password) VALUES (?, ?)', [name, passwordHash]);

    } catch (err) {
        throw (err)
    } finally {
        if (conn) conn.release();
    }
}

async function userExists(name) {
    let conn;

    try {
        conn = await pool.getConnection();

        const res = await conn.query('SELECT COUNT(id) AS count FROM users WHERE name=?', [name]);

        return Number(res[0].count) != 0;

    } catch (err) {
        throw (err)
    } finally {
        if (conn) conn.release();
    }
}

module.exports = { createUser, userExists }