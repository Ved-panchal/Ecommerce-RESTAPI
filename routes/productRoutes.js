const express = require('express');
const { getProductById, getAllProducts } = require('../controllers/productController');
const productRouter = express.Router();

productRouter.get("/getproduct/:product_id",getProductById)
productRouter.get("/getallproduct",getAllProducts)

module.exports = productRouter;
