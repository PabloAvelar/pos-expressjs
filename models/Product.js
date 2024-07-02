const sequelize = require('../database/db');
const { DataTypes, Model } = require('sequelize');
const Suppliers = require('./Supplier')

class Products extends Model { }

Products.init({
    // Table
    product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    product_code: {
        type: DataTypes.STRING
    },

    gen_name: {
        type: DataTypes.STRING
    },

    o_price: {
        type: DataTypes.STRING
    },

    price: {
        type: DataTypes.STRING
    },

    supplier_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    qty: {
        type: DataTypes.STRING
    },

    qty_sold: {
        type: DataTypes.STRING
    },

    date_arrival: {
        type: DataTypes.STRING
    },

    onhand_qty: {
        type: DataTypes.STRING
    },

},

    // Connection
    {
        sequelize,
        modelName: 'Products',
        freezeTableName: true,
        timestamps: false,
    }

);

Products.belongsTo(Suppliers, {foreignKey: 'supplier_id'})
// Suppliers.hasMany(Products, {foreignKey: 'supplier_id'})

module.exports = Products;