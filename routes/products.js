const express = require('express');
const productsController = require('../controllers/productsController')

const router = express.Router();

router.get("/", productsController.get_products);

router.post("/", productsController.post_product);

router.put('/', productsController.put_product);

router.delete('/:product_id', productsController.delete_product);

module.exports = router;