import express from 'express';
import { addToCart, emptyCart, getCart, removeFromCart, updateCart } from '../controllers/cartController.js';
import authMiddleware from '../middlewares/authMiddlewares.js';

const cartRouter = express.Router();

cartRouter.post('/cart/:userId', authMiddleware, addToCart);
cartRouter.put('/cart/:userId', authMiddleware, updateCart);
cartRouter.get('/cart/:userId', authMiddleware, getCart);
cartRouter.delete('/cart/:userId', authMiddleware, removeFromCart);
cartRouter.delete('/cart/:userId/empty',authMiddleware, emptyCart);

export default cartRouter;
