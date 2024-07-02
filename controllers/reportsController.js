const SalesOrder = require('../models/SalesOrder');
const Customer = require('../models/Customer');
const Product = require('../models/Product');
const auth = require('../middlewares/auth');

exports.getReports = [
    auth,
    async function (req, res) {
        try {
            const data = await SalesOrder.findAll({
                include: [
                    
                    {
                        model: Product,
                        required: true
                    },
                    {
                        model: Customer,
                        required: true
                    },
                ],

                order: [['transaction_id', 'DESC']]
            });

            return res.status(200).json(data);

        } catch (error) {
            console.error(error);
            return res.status(500).json({error: 'Ocurrió un error al obtener los reportes'})
        }
    }
]