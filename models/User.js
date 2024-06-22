const sequelize = require('../database/db');
const { DataTypes, Model } = require('sequelize');

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    position: {
        type: DataTypes.STRING,
        allowNull: false
    },

},
    {
        sequelize,
        modelName: 'User',
        timestamps: false,
        freezeTableName: true,
    }
)

module.exports = User;