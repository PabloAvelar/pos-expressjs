const Supplier = require('../models/Supplier');
const { validationResult, matchedData, body } = require('express-validator');
const auth = require('../middlewares/auth');

exports.get_suppliers = [
    auth,

    async function (req, res) {
        const clients = await Supplier.findAll();

        return res.status(200).json(clients);
    }
]

exports.post_supplier = [

    // Middleware
    auth,
    // Verificaciones
    body('*')
        .trim()
        .escape(),

    body('supplier_name')
        .isString()
        .matches(/^[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s.-]+$/)
        .withMessage("invalid supplier name"),

    body('supplier_address')
        .isString()
        .matches(/^[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s.-]+$/)
        .withMessage("invalid supplier address"),

    body('supplier_contact')
        .isNumeric()
        .withMessage("invalid supplier contact"),

    body('contact_person')
        .isString()
        .matches(/^[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s.-]+$/)
        .withMessage("invalid contact person"),

    async function (req, res) {
        const errors = validationResult(req).array();

        if (errors.length > 0) return res.status(400).json({ message: 'errors!', errors });

        const data = matchedData(req);

        const newCustomer = await Supplier.create(data)

        res.status(200).json(
            {
                message: `new supplier created with id: ${newCustomer.supplier_id}`,
                status: 'success'
            }
        );

    }
]

exports.put_client = [

    // Middleware
    auth,
    // Verificaciones
    body('*')
        .trim()
        .escape(),

    body('supplier_id')
        .toInt()
        .isInt()
        .withMessage("invalid supplier id"),

    body('supplier_name')
        .isString()
        .matches(/^[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s.-]+$/)
        .withMessage("invalid supplier name"),

    body('supplier_address')
        .isString()
        .matches(/^[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s.-]+$/)
        .withMessage("invalid supplier address"),

    body('supplier_contact')
        .isNumeric()
        .withMessage("invalid supplier contact"),

    body('contact_person')
        .isString()
        .matches(/^[a-zA-ZÀ-ÿ0-9\u00f1\u00d1\s.-]+$/)
        .withMessage("invalid contact person"),

    async function (req, res) {
        const errors = validationResult(req).array();

        if (errors.length > 0) return res.status(400).json({ message: 'errors!', errors });

        const { supplier_id, ...updateData } = req.body;

        await Supplier.update(updateData, {
            where: { supplier_id }
        })

        res.status(200).json(
            {
                message: `supplier updated with id: ${supplier_id}`,
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

        const { supplier_id } = req.params;

        await Supplier.destroy({
            where: { supplier_id }
        })

        res.status(200).json(
            {
                message: `supplier deleted with id: ${supplier_id}`,
                status: 'success'
            }
        );
    }
]