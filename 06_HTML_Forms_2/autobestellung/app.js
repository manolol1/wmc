// Testserver: https://wmc-forms.manolol.xyz/

const express = require('express')
const path = require('path');

const app = express();

const port = 80;

// Middleware to parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// serve static files in www directory
app.use('/', express.static(path.join(__dirname, 'www')))

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
app.post('/submit-order', (req, res) => {
    // TODO: replace this with actual submitting code
    const formData = req.body;
    res.status(200).json(formData); // Send back the form data as JSON
});

app.get('/example', (req, res) => {
    res.status(301).redirect('/example-form.html');
});

app.listen(port, () => {
    console.log(`Forms server listening on port ${port}`)
  })