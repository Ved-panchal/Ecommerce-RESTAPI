const express = require('express');
const { getProductById, getAllProducts } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddlewares');
const productRouter = express.Router();

productRouter.get("/getproduct/:product_id",authMiddleware,getProductById)
productRouter.get("/getallproduct",getAllProducts)

module.exports = productRouter;
