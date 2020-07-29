const express = require('express');
const app = express();

const routeSeries = require('./routes/series');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/series', routeSeries);

module.exports = app;