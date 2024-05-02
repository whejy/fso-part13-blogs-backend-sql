const { Model, DataTypes } = require('sequelize')
const sequelize = require('./index')

class Blog extends Model {}

Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        author: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    { sequelize, underscored: true, timestamps: false, modelName: 'blog' }
);

module.exports = Blog;