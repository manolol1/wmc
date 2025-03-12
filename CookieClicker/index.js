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
    let password = await bcrypt.hash(req.body.password, 10);

    try {
        if (await db.userExists(req.body.username)) {
            res.status(409).redirect("messages/userexists.html");
            return;
        }

        await db.createUser(req.body.username, password);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error while creating user");
        return;
    }

    res.status(200).redirect("messages/usercreated.html");
})

app.get('/login', (req, res) => {
    res.redirect('login.html');
})

app.post('/login', async (req, res) => {
    try {
        if (!await db.userExists(req.body.username)) {
            res.status(401).redirect("messages/loginfailed.html");
            return;
        }

        const passwordHash = await db.getPasswordHash(req.body.username);

        if (await bcrypt.compare(req.body.password, passwordHash)) {
            res.status(200).send(`Logged in as ${req.body.username}`);
        } else {
            res.status(401).redirect("messages/loginfailed.html");
            return;
        }
        

    } catch (err) {
        console.log(err);
        res.status(500).send("Error while logging in.");
        return;
    }
})

app.listen(port, () => {
  console.log(`CookieClicker listening on port ${port}`)
})
