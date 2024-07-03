const SalesOrder = require('../models/SalesOrder');
const Customer = require('../models/Customer');
const Product = require('../models/Product');
const auth = require('../middlewares/auth');
const sequelize = require('../database/db');

exports.getFrequentCustomers = [
    auth,
    async function (req, res) {
        try {
            const data = await Customer.findAll({
                attributes: [
                    'customer_id',
                    'customer_name',
                    [
                        sequelize.fn('COUNT', sequelize.col('*')),
                        'total_records'
                    ]
                ],

                include: [
                    {
                        model: SalesOrder,
                        required: true
                    }
                ],
                group: 'customer_id',
                order: [['total_records', 'DESC']],
            });

            return res.status(200).json(data);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Cannot get frequent customers' })
        }
    }
];

exports.getSales = [
    auth,

    async function (req, res) {
        try {
            const data = await SalesOrder.findAll({
                attributes: [
                    'transaction_id',
                    'date',
                    [
                        sequelize.fn('COUNT', sequelize.col('*')), 'total_records'
                    ]
                ],

                group: 'date',
                order: [['total_records', 'DESC']]
            });

            return res.status(200).json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Cannot get sales stats' })
        }
    }
];

exports.getProductsSold = [
    auth,

    async function (req, res) {
        try {
            const data = await Product.findAll({
                attributes: [
                    'product_id', 'product_name',
                    [
                        sequelize.fn('COUNT', sequelize.col('*')), 'total_records'

                    ]
                ],

                group: 'product_id',
                order: [['total_records', 'DESC']]
            })

            return res.status(200).json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Cannot get products sold' })
        }
    }
]