import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';
import authMiddleware from '../middlewares/authMiddlewares.js';

const cartRouter = express.Router();

cartRouter.post('/cart/:userId', authMiddleware, addToCart);
cartRouter.get('/cart/:userId', authMiddleware, getCart);
cartRouter.delete('/cart/:userId', authMiddleware, removeFromCart);

export default cartRouter;
