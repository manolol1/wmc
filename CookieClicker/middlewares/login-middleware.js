const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    token = req.cookies.token;

    if (token == null) res.redirect('/login');

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {

        if (err) res.redirect('/login');

        req.user = user
        req.username = user.username
        next()
    })
}

module.exports = {authenticate}