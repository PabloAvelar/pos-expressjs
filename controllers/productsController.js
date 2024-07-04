const Product = require('../models/Product');
const { validationResult, matchedData, body } = require('express-validator');
const auth = require('../middlewares/auth');
const Suppliers = require('../models/Supplier');

exports.get_products = [
    auth,

    async function (req, res) {
        const products = await Product.findAll(
            {
                include: {
                    model: Suppliers,
                    required: true,
                    attributes: ['supplier_name']
                },

                order: [['product_id', 'DESC']]
            }
        );

        return res.status(200).json(products);
    }
]

exports.post_product = [

    // Middleware
    auth,
    // Verificaciones
    body('product_code')
        .trim()
        .escape()
        .isAscii()
        .withMessage("invalid product code"),

    body('gen_name') // generic name
        .trim()
        .escape()
        .isString()
        .matches(/^[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s.-]+$/)
        .withMessage("invalid generic name"),

    body('product_name')
        .trim()
        .escape()
        .isString()
        .matches(/^[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s.-]+$/)
        .withMessage("invalid product name"),

    body('o_price') // original price
        .trim()
        .escape()
        .isNumeric()
        .withMessage("invalid original price"),

    body('price') // price to sell
        .trim()
        .escape()
        .isNumeric()
        .withMessage("invalid price"),

    body('supplier_id') // foreign key for Supplier model
        .trim()
        .escape()
        .toInt()
        .isInt()
        .withMessage("invalid supplier_id")
        .bail()
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
        .trim()
        .escape()
        .toInt()
        .isInt()
        .withMessage("invalid qty number"),

    body('onhand_qty')
        .trim()
        .escape()
        .toInt()
        .isInt()
        .withMessage("invalid onhand_qty"),

    body('date_arrival')
        .trim()
        .escape()
        .isDate()
        .withMessage("invalid date arrival"),

    async function (req, res) {
        const errors = validationResult(req).array();

        if (errors.length > 0) return res.status(400).json({ message: 'errors!', errors });

        const data = matchedData(req);

        const newProduct = await Product.create(data)

        res.status(200).json(
            {
                message: `new product created with id: ${newProduct.product_id}`,
                status: 'success'
            },

        );

    }
]

exports.put_product = [

    // Middleware
    auth,
    body('product_id')
        .trim()
        .escape()
        .toInt()
        .isInt()
        .withMessage("invalid id")
        .bail()
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
        .trim()
        .escape()
        .isAscii()
        .withMessage("invalid product code"),

    body('gen_name') // generic name
        .trim()
        .escape()
        .isString()
        .matches(/^[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s.-]+$/)
        .withMessage("invalid generic name"),

    body('product_name')
        .trim()
        .escape()
        .isString()
        .matches(/^[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s.-]+$/)
        .withMessage("invalid product name"),

    body('o_price') // original price
        .trim()
        .escape()
        .isNumeric()
        .withMessage("invalid original price"),

    body('price') // price to sell
        .trim()
        .escape()
        .isNumeric()
        .withMessage("invalid price"),

    body('supplier_id') // foreign key for Supplier model
        .trim()
        .escape()
        .toInt()
        .isInt()
        .withMessage("invalid supplier_id")
        .bail()
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
        .trim()
        .escape()
        .toInt()
        .isInt()
        .withMessage("invalid qty number"),

    body('onhand_qty')
        .trim()
        .escape()
        .toInt()
        .isInt()
        .withMessage("invalid onhand_qty"),

    body('date_arrival')
        .trim()
        .escape()
        .isDate()
        .withMessage("invalid date arrival"),

    async function (req, res) {
        const errors = validationResult(req).array();

        if (errors.length > 0) return res.status(400).json({ message: 'errors!', errors });

        const { product_id, ...updateData } = req.body;

        await Product.update(updateData, {
            where: { product_id }
        })

        res.status(200).json(
            {
                message: `product updated with id: ${product_id}`,
                status: 'success'
            }
        );

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