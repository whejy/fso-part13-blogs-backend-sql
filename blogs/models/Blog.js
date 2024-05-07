const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Blog extends Model {}

Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        year: {
            type: DataTypes.INTEGER,
            validate: {
                isValidYear(value) {
                    const [min, max] = [1991, new Date().getFullYear()];
                    if (value < 1991 || value > max) {
                        throw new Error(
                            `Year must be between ${min} and ${max}`
                        );
                    }
                },
            },
        },
    },
    { sequelize, underscored: true, modelName: 'blog' }
);

module.exports = Blog;
