
// routes.js
const express = require('express');
const productRouter = express.Router();

// Define your routes here
productRouter.get('/', (req, res) => {
    res.send('API is running...');
});

// Add more routes as needed
// Example: router.get('/example', (req, res) => { ... });

module.exports = productRouter;
