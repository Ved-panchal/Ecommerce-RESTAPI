// routes.js
const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');

const cartRouter = express.Router();

// Add to cart
cartRouter.post('/cart/:userId', addToCart);

// Get the user's cart
cartRouter.get('/cart/:userId', getCart);

// Remove from cart
cartRouter.delete('/cart/:userId', removeFromCart);

module.exports = cartRouter;
