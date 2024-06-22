const sequelize = require('../database/db');
const { DataTypes, Model } = require('sequelize');

class Suppliers extends Model { }

Suppliers.init({
    // Table
    supplier_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    supplier_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    supplier_address: {
        type: DataTypes.STRING
    },

    supplier_contact: {
        type: DataTypes.STRING
    },

    contact_person: {
        type: DataTypes.STRING
    },

    note: {
        type: DataTypes.STRING
    },

},

    // Connection
    {
        sequelize,
        modelName: 'Suppliers',
        freezeTableName: true,
        timestamps: false,
    }

);

module.exports = Suppliers;