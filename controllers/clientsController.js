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

    // Middleware
    auth,
    // Verificaciones
    body('*')
        .trim()
        .escape(),

    body('contact')
        .toInt()
        .isInt()
        .withMessage("invalid contact number"),

    body('membership_number')
        .toInt()
        .isInt()
        .withMessage("invalid membership number"),

    async function (req, res) {
        const errors = validationResult(req).array();

        if (errors.length > 0) return res.status(400).json({message: 'errors!', errors});

        const { customer_name, address, contact, membership_number } = matchedData(req);

        const newCustomer = await Customer.create({
            customer_name,
            address,
            contact,
            membership_number
        })


        res.json({ message: `new customer created. id: ${newCustomer.customer_id}` });


    }
]