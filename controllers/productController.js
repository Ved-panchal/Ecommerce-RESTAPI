import ProductModel from '../models/productModel.js';

export const getProductById = async (req, res) => {
    const { product_id } = req.params;

    try {
        let product = await ProductModel.findOne({ _id: product_id });
        if (!product) {
            return res.status(404).json("Not Found");
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json("Server Error");
    }
}

export const getAllProducts = async (req, res) => {
    try {
        let products = await ProductModel.find();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json("Server Error");
    }
}
