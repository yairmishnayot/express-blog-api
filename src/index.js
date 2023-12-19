require('dotenv').config()
const express = require('express')
require('./config/db');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('hello world!');
})

app.listen(port, function () {
    console.log(`App is listening on port ${port}`);
});