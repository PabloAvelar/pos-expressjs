const express = require('express');
const productsController = require('../controllers/productsController')

const router = express.Router();

router.get("/", productsController.get_products);

router.post("/", productsController.post_product);

module.exports = router;