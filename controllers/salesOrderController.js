const SalesOrder = require('../models/SalesOrder');
const { validationResult, matchedData, body } = require('express-validator');
const auth = require('../middlewares/auth');
const Suppliers = require('../models/Supplier');
const Customer = require('../models/Customer');
const Products = require('../models/Product');
const User = require('../models/User');

exports.get_sales = [
    auth,

    async function (req, res) {
        const sales = await SalesOrder.findAll();

        return res.status(200).json(sales);
    }
]

exports.post_sale = [

    // Middleware
    auth,
    // Verificaciones
    body('product_id')
        .trim()
        .escape()
        .isAscii()
        .withMessage("invalid product code")
        .bail()
        .custom(async value => {
            try {
                const id_found = await Products.findOne({ where: { product_id: value } })
                if (id_found === null) {
                    return Promise.reject("Product ID does not exist");
                }
            } catch (e) {
                console.error(e);
                return Promise.reject("Couldn't find product");
            }
        }),

    body('user_id')
        .trim()
        .escape()
        .toInt()
        .isInt()
        .withMessage("invalid user id")
        .bail()
        .custom(async value => {
            try {
                const id_found = await User.findOne({ where: { id: value } })
                if (id_found === null) {
                    return Promise.reject("User ID does not exist");
                }
            } catch (e) {
                console.error(e);
                return Promise.reject("Couldn't find user");
            }
        }),

    body('qty')
        .trim()
        .escape()
        .isNumeric()
        .withMessage("invalid quantity"),

    body('amount')
        .trim()
        .escape()
        .isNumeric()
        .withMessage("invalid amount"),

    body('price') // price to sell
        .trim()
        .escape()
        .isNumeric()
        .withMessage("invalid price"),

    body('qty')
        .trim()
        .escape()
        .toInt()
        .isInt()
        .withMessage("invalid qty number"),


    body('customer_id')
        .trim()
        .escape()
        .isAscii()
        .withMessage("invalid qty_sold")
        .bail()
        .custom(async value => {
            try {
                const id_found = await Customer.findOne({ where: { customer_id: value } })
                if (id_found === null) {
                    return Promise.reject("Customer ID does not exist")
                }
            } catch (e) {
                console.error(e);
                return Promise.reject("Couldn't find customer")
            }
        })
        .withMessage("Customer not found"),

    body('date')
        .trim()
        .escape()
        .isDate()
        .withMessage("invalid date"),

    async function (req, res) {
        const errors = validationResult(req).array();

        if (errors.length > 0) return res.status(400).json({ message: 'errors!', errors });

        const data = matchedData(req);

        const newSalesOrder = await SalesOrder.create(data)

        res.json({ message: `new sale created with id: ${newSalesOrder.transaction_id}` });

    }
]

exports.put_sale = [

    // Middleware
    auth,
    body('transaction_id')
        .trim()
        .escape()
        .toInt()
        .isInt()
        .withMessage("invalid id")
        .bail()
        .custom(async value => {
            try {
                const user = await SalesOrder.findOne({ where: { transaction_id: value } })
                if (user === null) {
                    return Promise.reject("SalesOrder ID does not exist")
                }
            } catch (e) {
                console.error(e);
                return Promise.reject("Couldn't find sale order")
            }
        })
        .withMessage("Invalid query for id sale order"),

    body('product_id')
        .trim()
        .escape()
        .isAscii()
        .withMessage("invalid product code")
        .bail()
        .custom(async value => {
            try {
                const id_found = await Products.findOne({ where: { product_id: value } })
                if (id_found === null) {
                    return Promise.reject("Product ID does not exist");
                }
            } catch (e) {
                console.error(e);
                return Promise.reject("Couldn't find product");
            }
        }),

    body('user_id')
        .trim()
        .escape()
        .toInt()
        .isInt()
        .withMessage("invalid user id")
        .bail()
        .custom(async value => {
            try {
                const id_found = await User.findOne({ where: { id: value } })
                if (id_found === null) {
                    return Promise.reject("User ID does not exist");
                }
            } catch (e) {
                console.error(e);
                return Promise.reject("Couldn't find user");
            }
        }),

    body('qty')
        .trim()
        .escape()
        .isNumeric()
        .withMessage("invalid quantity"),

    body('amount')
        .trim()
        .escape()
        .isNumeric()
        .withMessage("invalid amount"),

    body('price') // price to sell
        .trim()
        .escape()
        .isNumeric()
        .withMessage("invalid price"),

    body('qty')
        .trim()
        .escape()
        .toInt()
        .isInt()
        .withMessage("invalid qty number"),


    body('customer_id')
        .trim()
        .escape()
        .isAscii()
        .withMessage("invalid qty_sold")
        .bail()
        .custom(async value => {
            try {
                const id_found = await Customer.findOne({ where: { customer_id: value } })
                if (id_found === null) {
                    return Promise.reject("Customer ID does not exist")
                }
            } catch (e) {
                console.error(e);
                return Promise.reject("Couldn't find customer")
            }
        })
        .withMessage("Customer not found"),

    body('date')
        .trim()
        .escape()
        .isDate()
        .withMessage("invalid date"),

    async function (req, res) {
        const errors = validationResult(req).array();

        if (errors.length > 0) return res.status(400).json({ message: 'errors!', errors });

        const { transaction_id, ...updateData } = req.body;

        await SalesOrder.update(updateData, {
            where: { transaction_id }
        })

        res.json({ message: `sale order updated with id: ${transaction_id}` });

    }
]

exports.delete_sale = [
    auth,
    body("*")
        .trim()
        .escape(),

    async function (req, res) {
        const errors = validationResult(req).array();

        if (errors.length > 0) return res.status(400).json({ message: 'errors!', errors });

        const { transaction_id } = req.params;

        await SalesOrder.destroy({
            where: { transaction_id }
        })

        res.json({ message: `sale order deleted with id: ${transaction_id}` });
    }
]