const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const Context = require('./models/context/context');
const FileContext = require('./models/fileContext/fileHandler');
const bodyParser = require('body-parser');
const db = new Context(new FileContext('series'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/series', async (request, response) => {
    const result = await db.read();
    response.json(result);
});

app.post('/series', async (request, response) => {
    const { nome, status } = request.body;
    const result = await db.create({ nome, status });
    response.json(result);
});

app.put('/series/:id', async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const { nome, status } = request.body;
        const result = await db.update(id, { nome, status });
        response.json({
            success: true
        });
    }
    catch (err) {
        response.json({
            success: false,
            error: err.message
        });
    }
});

app.delete('/series/:id', async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        await db.delete(id);
        response.json({
            success: true
        })
    }
    catch (error) {
        response.json({
            success: false,
            error: error.message
        })
    }
});

app.listen(port, (err) => {
    if (err) {
        console.error('Error: ', err);
    }
    console.log('Application is runnning...');
});