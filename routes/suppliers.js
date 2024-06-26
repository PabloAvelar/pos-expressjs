const express = require('express');
const suppliersController = require("../controllers/suppliersController");
const router = express.Router();

router.get("/", suppliersController.get_suppliers);

router.post("/", suppliersController.post_supplier);

router.put('/', suppliersController.put_client);

router.delete('/:supplier_id', suppliersController.delete_client);

module.exports = router;