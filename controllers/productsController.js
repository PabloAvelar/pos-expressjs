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

    body('product_code')
        .isAlphanumeric()
        .withMessage("invalid product code"),

    body('gen_name') // generic name
        .isAlphanumeric()
        .withMessage("invalid generic name"),

    body('product_name')
        .isAlphanumeric()
        .withMessage("invalid product name"),

    body('o_price') // original price
        .isNumeric()
        .withMessage("invalid original price"),

    body('price') // price to sell
        .isNumeric()
        .withMessage("invalid price"),

    body('supplier_id') // foreign key for Supplier model
        .toInt()
        .isInt()
        .withMessage("invalid supplier_id")
        .custom(async value => {
            try {
                const user = await Suppliers.findOne({ where: { supplier_id: value } })
                if (user === null) {
                    return Promise.reject("Supplier ID does not exist")
                }
            } catch (e) {
                console.error(e);
                return Promise.reject("Couldn't find supplier")
            }
        })
        .withMessage("Supplier not found"),

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

    body('date_arrival')
        .isAlphanumeric()
        .withMessage("invalid date arrival"),

    async function (req, res) {
        const errors = validationResult(req).array();

        if (errors.length > 0) return res.status(400).json({ message: 'errors!', errors });

        const data = matchedData(req);

        const newProduct = await Product.create(data)

        res.json({ message: `new product created with id: ${newProduct.product_id}` });

    }
]

exports.put_product = [

    // Middleware
    auth,
    // Verificaciones
    body('*')
        .trim()
        .escape(),

    body('product_id')
        .toInt()
        .isInt()
        .withMessage("invalid id")
        .custom(async value => {
            try {
                const user = await Product.findOne({ where: { product_id: value } })
                if (user === null) {
                    return Promise.reject("Product ID does not exist")
                }
            } catch (e) {
                console.error(e);
                return Promise.reject("Couldn't find product")
            }
        })
        .withMessage("Invalid query for id product"),

    body('product_code')
        .isAlphanumeric()
        .withMessage("invalid product code"),

    body('gen_name') // generic name
        .isAlphanumeric()
        .withMessage("invalid generic name"),

    body('product_name')
        .isAlphanumeric()
        .withMessage("invalid product name"),

    body('o_price') // original price
        .isNumeric()
        .withMessage("invalid original price"),

    body('price') // price to sell
        .isNumeric()
        .withMessage("invalid price"),

    body('supplier_id') // foreign key for Supplier model
        .toInt()
        .isInt()
        .withMessage("invalid supplier_id")
        .custom(async value => {
            try {
                const user = await Suppliers.findOne({ where: { supplier_id: value } })
                if (user === null) {
                    return Promise.reject("Supplier ID does not exist")
                }
            } catch (e) {
                console.error(e);
                return Promise.reject("Couldn't find supplier")
            }
        })
        .withMessage("Supplier not found"),

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

    body('date_arrival')
        .isAlphanumeric()
        .withMessage("invalid date arrival"),

    async function (req, res) {
        const errors = validationResult(req).array();

        if (errors.length > 0) return res.status(400).json({ message: 'errors!', errors });

        const { product_id, ...updateData } = req.body;

        await Product.update(updateData, {
            where: { product_id }
        })

        res.json({ message: `product updated with id: ${product_id}` });

    }
]

exports.delete_product = [
    auth,
    body("*")
        .trim()
        .escape(),

    async function (req, res) {
        const errors = validationResult(req).array();

        if (errors.length > 0) return res.status(400).json({ message: 'errors!', errors });

        const { product_id } = req.params;

        await Product.destroy({
            where: { product_id }
        })

        res.json({ message: `customer deleted with id: ${product_id}` });
    }
]