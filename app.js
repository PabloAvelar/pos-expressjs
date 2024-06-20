const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const clientsRouter = require('./routes/clients');
const productsRouter = require('./routes/products');
const reportsRouter = require('./routes/reports');
const salesRouter = require('./routes/sales');
const statisticsRouter = require('./routes/statistics');
const suppliersRouter = require('./routes/suppliers');

const app = express();

app.use(morgan('dev'));
app.use(express.json())
app.use(express.text());
app.use(express.urlencoded({extended: false}));

// Enrutamiento
app.use('/api/clients', clientsRouter);
app.use('/api/products', productsRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/sales', salesRouter);
app.use('/api/statistics', statisticsRouter);
app.use('/api/suppliers', suppliersRouter);

module.exports = app;