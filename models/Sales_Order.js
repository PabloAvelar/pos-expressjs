const sequelize = require('../database/db');
const { DataTypes, Model } = require('sequelize');
const Products = require('./Product')
const Customer = require('./Customer')
const User = require('./User')

class Sales_Order extends Model { }

Sales_Order.init({
    // Table
    transtaction_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    qty: {
        type: DataTypes.STRING
    },

    amount: {
        type: DataTypes.STRING
    },

    profit: {
        type: DataTypes.STRING
    },


    price: {
        type: DataTypes.STRING
    },

    discount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    date: {
        type: DataTypes.STRING
    },

},

    // Connection
    {
        sequelize,
        modelName: 'Sales_Order',
        freezeTableName: true,
        timestamps: false,
    }

);

Sales_Order.belongsTo(Products, {foreignKey: 'product_id'});
Products.hasOne(Sales_Order, {foreignKey: 'product_id'});

Sales_Order.belongsTo(Customer, {foreignKey: 'customer_id'});
Customer.hasMany(Sales_Order, {foreignKey: 'customer_id'});

User.belongsTo(Sales_Order, {foreignKey: 'user_id'});
Sales_Order.hasOne(User, {foreignKey: 'user_id'});

module.exports = Products;