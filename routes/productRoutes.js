import express from 'express';
import { getProductById, getAllProducts } from '../controllers/productController.js';
import authMiddleware from '../middlewares/authMiddlewares.js';

const productRouter = express.Router();

productRouter.get("/getproduct/:product_id", authMiddleware, getProductById);
productRouter.get("/getallproduct", getAllProducts);

export default productRouter;
