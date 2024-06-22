const Customer = require('../models/Customer');
const { validationResult, matchedData, body } = require('express-validator');
const auth = require('../middlewares/auth');

exports.get_clients = [
    auth,

    async function (req, res) {
        const clients = await Customer.findAll();

        return res.status(200).json(clients);
    }
]

exports.post_client = [
    async function (req, res, next) {
        console.log(req.body);

        next();
    },

    body('*')
        .trim()
        .escape(),

    async function (req, res){
        const errors = validationResult(req).array();

        if (errors.length > 0){
            res.status(400).json(errors);   
            return;
        }


    }
]