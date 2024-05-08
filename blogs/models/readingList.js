const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class ReadingList extends Model {}

ReadingList.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                field: 'id',
            },
        },
        blogId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'blogs',
                field: 'id',
            },
        },
        read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'reading_list',
    }
);

module.exports = ReadingList;
