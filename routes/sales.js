const express = require('express');
const salesOrder = require('../controllers/salesOrderController')

const router = express.Router();

router.get("/", salesOrder.get_sales);

router.post("/", salesOrder.post_sale);

router.put('/', salesOrder.put_sale);

router.delete('/:transaction_id', salesOrder.delete_sale);

module.exports = router;