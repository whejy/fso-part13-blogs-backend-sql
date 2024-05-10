const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Session extends Model {}

Session.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expired: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        
    },
    { sequelize, underscored: true, modelName: 'session' }
);

module.exports = Session;
