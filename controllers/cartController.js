import CartModel from '../models/cartModel.js';

export const addToCart = async (req, res) => {
    const { userId } = req.params;
    const { product_id, quantity } = req.body;

    if (!product_id || !quantity) {
        return res.status(400).json({ error: 'Product ID and quantity are required' });
    }

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
        console.error('Error adding to cart:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await CartModel.findOne({ user_id: userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (err) {
        console.error('Error fetching cart:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const removeFromCart = async (req, res) => {
    const { userId } = req.params;
    const { product_id } = req.body;

    if (!product_id) {
        return res.status(400).json({ error: 'Product ID is required' });
    }

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
        console.error('Error removing from cart:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const updateCart = async (req, res) => {
    const { userId } = req.params;
    const { product_id, quantity } = req.body;

    if (!product_id || !quantity) {
        return res.status(400).json({ error: 'Product ID and quantity are required' });
    }

    try {
        let cart = await CartModel.findOne({ user_id: userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const productIndex = cart.products.findIndex(p => p.product_id === product_id);
        if (productIndex > -1) {
            cart.products[productIndex].quantity = quantity;
            await cart.save();
            res.status(200).json(cart);
        } else {
            res.status(404).json({ error: 'Product not found in cart' });
        }
    } catch (err) {
        console.error('Error updating cart:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const emptyCart = async (req, res) => {
    const { userId } = req.params;

    try {
        let cart = await CartModel.findOne({ user_id: userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        cart.products = [];
        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        console.error('Error emptying cart:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

