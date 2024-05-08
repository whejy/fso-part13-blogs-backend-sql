const { DataTypes } = require('sequelize');

const up = async ({ context: queryInterface }) => {
    await queryInterface.createTable('reading_lists', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                field: 'id',
            },
        },
        blog_id: {
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
    });
};

const down = async ({ context: queryInterface }) => {
    await queryInterface.dropTable('reading_lists');
};

module.exports = { up, down };
