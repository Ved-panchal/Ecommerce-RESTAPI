import ProductModel from '../models/productModel.js';

export const getProductById = async (req, res) => {
    const { product_id } = req.params;

    try {
        let product = await ProductModel.findOne({ _id: product_id });
        if (!product) {
            return res.status(404).json("Not Found");
        }
        const transformedProduct = { id: product._id, ...product.toObject(), _id: undefined };
        res.status(200).json(transformedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json("Server Error");
    }
};

export const getAllProducts = async (req, res) => {
    try {
        let products = await ProductModel.find();
        const transformedProducts = products.map(product => ({ id: product._id, ...product.toObject(), _id: undefined }));
        res.status(200).json({ products: transformedProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
