const mariadb = require('mariadb');
const dotenv = require('dotenv');

dotenv.config()

const pool = mariadb.createPool({host: '127.0.0.1', user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: 'cookieclicker', connectionLimit: 5});

async function createUser(name, passwordHash) {
    let conn;

    try {
        conn = await pool.getConnection();

        const res = await conn.query('INSERT INTO users (name, password, cookies) VALUES (?, ?, 0)', [name, passwordHash]);

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

async function getPasswordHash(name) {
    let conn;

    try {
        conn = await pool.getConnection();

        const res = await conn.query('SELECT password FROM users WHERE name=?', [name]);


        return res[0].password;

    } catch (err) {
        throw (err)
    } finally {
        if (conn) conn.release();
    }
}

async function getCookies(name) {
    let conn;

    try {
        conn = await pool.getConnection();

        const res = await conn.query('SELECT cookies FROM users WHERE name=?', [name]);

        console.log(res[0])

        return res[0].cookies;

    } catch (err) {
        throw (err)
    } finally {
        if (conn) conn.release();
    }
}

async function setCookies(name, cookies) {
    let conn;

    try {
        conn = await pool.getConnection();

        const res = await conn.query('UPDATE users SET cookies=? WHERE name=?', [cookies, name])

    } catch (err) {
        throw (err)
    } finally {
        if (conn) conn.release();
    }
}

module.exports = { createUser, userExists, getPasswordHash, getCookies, setCookies }