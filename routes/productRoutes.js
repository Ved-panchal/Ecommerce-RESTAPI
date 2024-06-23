import express from 'express';
import { getProductById, getAllProducts } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get("/getproduct/:product_id", getProductById);
productRouter.get("/getallproduct", getAllProducts);

export default productRouter;
