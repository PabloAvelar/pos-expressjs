const sequelize = require('../database/db');
const { DataTypes, Model } = require('sequelize');

class Customer extends Model { }

Customer.init({
    // Table
    customer_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    customer_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    address: {
        type: DataTypes.STRING
    },

    contact: {
        type: DataTypes.STRING
    },

    membership_number: {
        type: DataTypes.STRING
    },

},

    // Connection
    {
        sequelize,
        modelName: 'Customer',
        freezeTableName: true,
        timestamps: false,
    }

);

module.exports = Customer;