const express = require('express');
const statisticsController = require("../controllers/statisticsController");
const router = express.Router();

router.get("/frequentcustomers", statisticsController.getFrequentCustomers);
router.get("/sales", statisticsController.getSales);
router.get("/productssold", statisticsController.getProductsSold);

module.exports = router;