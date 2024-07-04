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
    body('customer_name')
        .trim()
        .escape()
        .isString()
        .matches(/^[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s.-]+$/)
        .withMessage("invalid customer name"),
    body('address')
        .trim()
        .escape()
        .isString()
        .matches(/^[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s.-]+$/)
        .withMessage("invalid address"),
    body('contact')
        .trim()
        .escape()
        .isMobilePhone()
        .withMessage("invalid phone number"),
    body('membership_number')
        .trim()
        .escape()
        .toInt()
        .isInt()
        .withMessage("invalid membership number"),

    async function (req, res) {
        const errors = validationResult(req).array();

        if (errors.length > 0) return res.status(400).json({ message: 'errors!', errors });

        const data = matchedData(req);

        const newCustomer = await Customer.create(data)

        res.status(200).json(
            {
                message: `new customer created with id: ${newCustomer.customer_id}`,
                status: 'success'
            }
        );

    }
]

exports.put_client = [

    // Middleware
    auth,
    body('customer_name')
        .trim()
        .escape()
        .isString()
        .matches(/^[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s.-]+$/)
        .withMessage("invalid customer name"),
    body('address')
        .trim()
        .escape()
        .isString()
        .matches(/^[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s.-]+$/)
        .withMessage("invalid address"),
    body('customer_id')
        .trim()
        .escape()
        .toInt()
        .isInt()
        .withMessage("invalid id")
        .bail()
        .custom(async value => {
            try {
                const user = await Customer.findOne({ where: { customer_id: value } })
                if (user === null) {
                    return Promise.reject("Customer ID does not exist")
                }
            } catch (e) {
                console.error(e);
                return Promise.reject("Couldn't find customer")
            }
        })
        .withMessage("Invalid query for id customer"),

    body('contact')
        .trim()
        .escape()
        .isMobilePhone()
        .withMessage("invalid phone number"),

    body('membership_number')
        .trim()
        .escape()
        .toInt()
        .isInt()
        .withMessage("invalid membership number"),

    async function (req, res) {
        const errors = validationResult(req).array();

        if (errors.length > 0) return res.status(400).json({ message: 'errors!', errors });

        const { customer_id, ...updateData } = req.body;

        await Customer.update(updateData, {
            where: { customer_id }
        })

        res.status(200).json(
            {
                message: `customer updated with id: ${customer_id}`,
                status: 'success'
            }
        );

    }
]

exports.delete_client = [
    auth,
    body("*")
        .trim()
        .escape(),

    async function (req, res) {
        const errors = validationResult(req).array();

        if (errors.length > 0) return res.status(400).json({ message: 'errors!', errors });

        const { customer_id } = req.params;

        await Customer.destroy({
            where: { customer_id }
        })

        res.json({ message: `customer deleted with id: ${customer_id}` });
    }
]