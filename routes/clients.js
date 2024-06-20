const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {
    res.send("hola mundo")
})

module.exports = router;