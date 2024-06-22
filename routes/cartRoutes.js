const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddlewares');

const cartRouter = express.Router();

cartRouter.post('/cart/:userId',authMiddleware, addToCart);
cartRouter.get('/cart/:userId', authMiddleware,getCart);
cartRouter.delete('/cart/:userId', authMiddleware,removeFromCart);

module.exports = cartRouter;
