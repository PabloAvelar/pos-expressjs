const express = require('express');
const usersController = require('../controllers/loginController');

const router = express.Router();

router.post("/", usersController.login);

module.exports = router;