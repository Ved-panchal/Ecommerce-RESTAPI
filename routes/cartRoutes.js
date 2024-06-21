// routes.js
const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');

const cartRouter = express.Router();

cartRouter.post('/cart/:userId', addToCart);

cartRouter.get('/cart/:userId', getCart);

cartRouter.delete('/cart/:userId', removeFromCart);

module.exports = cartRouter;
