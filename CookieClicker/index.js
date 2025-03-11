const express = require('express');
const db = require('./db.js');
const bcrypt = require('bcrypt');

const app = express();
const port = 80;

app.use(express.static('static'));
app.use(express.json());
app.use(express.urlencoded());


app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/register', (req, res) => {
    res.redirect('register.html');
})

app.post('/register', async (req, res) => {
    let password = await bcrypt.hash(req.body.password,10);

    try {
        await db.createUser(req.body.username, password);
    } catch (err) {
        res.status(500).send("Error while creating user")
    }
})

app.listen(port, () => {
  console.log(`CookieClicker listening on port ${port}`)
})
