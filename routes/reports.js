const express = require('express');
const reportsController = require('../controllers/reportsController')

const router = express.Router();

router.get("/", reportsController.getReports);

module.exports = router;