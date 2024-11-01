// Testserver: https://wmc-forms.manolol.xyz/

const port = 80;

const express = require('express')
const path = require('path');
const mariadb = require('mariadb');

const app = express();

const pool = mariadb.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "TestDB",
    database: "ford",
    connectionLimit: 5
});

// test database connection
async function testConnection() {
    console.log("Testing database connection");
    try {
        const conn = await pool.getConnection();
        console.log("Connected to database");
        conn.release();
    } catch (err) {
        console.error("Error connecting to database: ", err);
    }
}
setTimeout(testConnection, 1000);

// Middleware to parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// serve static files in www directory
app.use('/', express.static(path.join(__dirname, 'www/static')))

// handle GET requests for basic json output
app.get('/json', (req, res) => {
    const queryParams = req.query;
    res.status(200).json(queryParams); // Send back the query parameters as JSON
});

// handle POST requests for basic json output
app.post('/json', (req, res) => {
    const formData = req.body;
    res.status(200).json(formData); // Send back the form data as JSON
});

// handle POST requests for submitting order
app.post('/submit-order', async (req, res) => {
    const formData = req.body;

    let conn;
    try {
        conn = await pool.getConnection();

        // query to get the car_id based on the model_name
        const carResult = await conn.query("SELECT car_id FROM cars WHERE model_name = ?", [formData.model]);

        // make sure that car model exists
        if (carResult.length === 0) {
            res.status(400).json({ success: false, error: "Car model not found" });
            return;
        }

        const carId = carResult[0].car_id;

        // replace newlines with <br> in comment
        const comment = formData.comment.replace(/\r?\n|\r/g, '<br>');

        // query to insert order into database
        const insertResult = await conn.query("INSERT INTO orders (car_id, engine_type, power, color, extras, delivery_date, comment, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [carId, formData.enginetype, formData.power, formData.color, JSON.stringify(formData.extras), formData.deliverydate, comment, formData.email]);

        // get orderId from insert result
        const orderId = insertResult.insertId.toString();

        res.status(200).json({ success: true, orderId, formData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err });
    } finally {
        if (conn) conn.release();
    }
});

// handle GET requests for getting all orders
app.get('/orders', async (req, res) => {
    let conn;

    try {
        conn = await pool.getConnection();

        // query to get all orders
        const orders = await conn.query("SELECT * FROM orders");

        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err });
    } finally {
        if (conn) conn.release();
    }
});

// handle GET requests for getting a list of cars
app.get('/cars', async (req, res) => {
    let conn;

    try {
        conn = await pool.getConnection();

        // query to get all cars
        const orders = await conn.query("SELECT * FROM cars");

        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err });
    } finally {
        if (conn) conn.release();
    }
});

// handle GET requests for getting a specific order
app.get('/orders?/:orderId', async (req, res) => {
    let conn;

    try {
        conn = await pool.getConnection();

        // query to get specified order
        const order = await conn.query("SELECT * FROM orders WHERE order_id = ?", [req.params.orderId]);

        if (order.length === 0) {
            res.status(404).json({ success: false, error: "Order not found" });
            return;
        }

        res.status(200).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err });
    } finally {
        if (conn) conn.release();
    }
});

app.get('/example', (req, res) => {
    res.status(301).redirect('/example-form.html');
});

app.listen(port, () => {
    console.log(`Forms server listening on port ${port}`);
});