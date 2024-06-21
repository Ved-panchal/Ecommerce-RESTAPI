// cartModel.js
const mongoose = require('mongoose');
const { productSchema } = require('./productModel');

const cartSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true, // Ensure one cart per user
    },
    products: [productSchema], // Array of product objects
});

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;
