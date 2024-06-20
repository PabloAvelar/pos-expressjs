const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("asdas")
})

module.exports = router;