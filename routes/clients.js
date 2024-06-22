const express = require('express');
const clientsController = require("../controllers/clientsController");
const router = express.Router();

router.get("/", clientsController.get_clients);

router.post("/", clientsController.post_client);

module.exports = router;