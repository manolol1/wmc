const express = require('express');
const db = require('./db.js');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const loginMiddleware = require('./middlewares/login-middleware.js');
const path = require('path')

dotenv.config();

const app = express();
const port = 80;

app.use(express.static('static'));
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded());
app.use(cookieParser());

function generateJWT(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, {expiresIn: '2d'});
}

app.get('/', (req, res) => {
    res.redirect('/game');
})

app.get('/game', loginMiddleware.authenticate, (req, res) => {
    res.status(200).sendFile(path.join(__dirname, './game.html'));
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
            res.status(404).send("invalid username");
            return;
        }

        const passwordHash = await db.getPasswordHash(req.body.username);

        if (await bcrypt.compare(req.body.password, passwordHash)) {
            res.status(200).send(generateJWT({username: req.body.username}))
        } else {
            res.status(401).send("invalid password");
            return;
        }
        

    } catch (err) {
        console.log(err);
        res.status(500).send("Error while logging in.");
        return;
    }
})

app.get('/getcookies', loginMiddleware.authenticate, async (req, res) => {
    const cookies = await db.getCookies(req.username)
    console.log(cookies)

    res.status(200).send(String(cookies));
})

app.post('/setcookies', loginMiddleware.authenticate, async (req, res) => {
    await db.setCookies(req.username, req.body.cookies);

    res.status(200).send('ok')
})

app.listen(port, () => {
  console.log(`CookieClicker listening on port ${port}`)
})
