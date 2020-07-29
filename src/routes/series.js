const express = require('express');
const router = express.Router();
const Context = require('../models/context/context');
const FileContext = require('../models/fileContext/fileContext');
const db = new Context(new FileContext('series'));

router.get('/', async (request, response) => {
    try {
        const result = await db.read();
        response.json(result);
    }
    catch (error) {
        response.json({
            success: false,
            error: error.message
        })
    }
});

router.post('/', async (request, response) => {
    try {
        const result = await db.create(request.body);
        response.json(result);
    }
    catch (error) {
        response.json({
            success: false,
            error: error.message
        })
    }
});

router.put('/:id', async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const { nome, status } = request.body;
        const result = await db.update(id, { nome, status });
        response.json(result);
    }
    catch (error) {
        response.json({
            success: false,
            error: error.message
        });
    }
});

router.delete('/:id', async (request, response) => {
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

module.exports = router;