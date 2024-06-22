const Product = require('../models/Product');
const { validationResult, matchedData, body } = require('express-validator');
const auth = require('../middlewares/auth');
const Suppliers = require('../models/Supplier');

exports.get_products = [
    auth,

    async function (req, res) {
        const products = await Product.findAll();

        return res.status(200).json(products);
    }
]

exports.post_product = [

    // Middleware
    auth,
    // Verificaciones
    body('*')
        .trim()
        .escape(),

    body('supplier_id')
        .toInt()
        .isInt()
        .withMessage("Invalid supplier id")
        .custom(async value => {
            try {
                const supplier = Suppliers.findOne({ where: { supplier_id: value } })
                if (supplier == null){
                    Promise.reject("Couldn't find supplier id")
                }
            } catch (error) {
                console.error(error);
                Promise.reject("Error finding supplier id");
            }
        })
        .withMessage("Supplier id does not exist"),

    body('qty')
        .toInt()
        .isInt()
        .withMessage("invalid qty number"),

        body('onhand_qty')
        .toInt()
        .isInt()
        .withMessage("invalid onhand_qty"),

        body('qty_sold')
        .toInt()
        .isInt()
        .withMessage("invalid qty_sold"),

    async function (req, res) {
        const errors = validationResult(req).array();

        if (errors.length > 0) return res.status(400).json({ message: 'errors!', errors });

        const data = matchedData(req);

        const newProduct = await Product.create(data)

        res.json({ message: `new product created with id: ${newProduct.product_id}` });

    }
]

exports.put_client = [

    // Middleware
    auth,
    // Verificaciones
    body('*')
        .trim()
        .escape(),

    body('customer_id')
        .toInt()
        .isInt()
        .withMessage("invalid id")
        .custom(async value => {
            try {
                const user = await Product.findOne({ where: { customer_id: value } })
                if (user === null) {
                    return Promise.reject("Product ID does not exist")
                }
            } catch (e) {
                console.error(e);
                return Promise.reject("Couldn't find customer")
            }
        })
        .withMessage("Invalid query for id customer"),

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

        if (errors.length > 0) return res.status(400).json({ message: 'errors!', errors });

        const { customer_id, ...updateData } = req.body;

        await Product.update(updateData, {
            where: { customer_id }
        })

        res.json({ message: `customer updated with id: ${customer_id}` });

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

        await Product.destroy({
            where: { customer_id }
        })

        res.json({ message: `customer deleted with id: ${customer_id}` });
    }
]