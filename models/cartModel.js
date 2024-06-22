import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    product_id: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const cartSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    products: [
        productSchema 
    ],
});

const CartModel = mongoose.model('Cart', cartSchema);

export default CartModel;
