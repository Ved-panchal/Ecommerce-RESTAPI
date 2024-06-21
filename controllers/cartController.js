// cartController.js
const CartModel = require('../models/cartModel');

const addToCart = async (req, res) => {
    const { userId } = req.params;
    const { product_id, quantity } = req.body;

    try {
        let cart = await CartModel.findOne({ user_id: userId });
        if (!cart) {
            cart = new CartModel({ user_id: userId, products: [] });
        }

        const productIndex = cart.products.findIndex(p => p.product_id === product_id);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product_id, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await CartModel.findOne({ user_id: userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const removeFromCart = async (req, res) => {
    const { userId } = req.params;
    const { product_id } = req.body;

    try {
        let cart = await CartModel.findOne({ user_id: userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const productIndex = cart.products.findIndex(p => p.product_id === product_id);
        if (productIndex > -1) {
            cart.products.splice(productIndex, 1);
            await cart.save();
            res.status(200).json(cart);
        } else {
            res.status(404).json({ error: 'Product not found in cart' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { addToCart, getCart, removeFromCart };
