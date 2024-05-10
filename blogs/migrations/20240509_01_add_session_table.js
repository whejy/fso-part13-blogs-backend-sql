const { DataTypes } = require('sequelize');

const up = async ({ context: queryInterface }) => {
    await queryInterface.createTable('sessions', {
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
        created_at: {
            type: DataTypes.DATE,
        },
        updated_at: {
            type: DataTypes.DATE,
        },
    });
};

const down = async ({ context: queryInterface }) => {
    await queryInterface.dropTable('sessions');
};

module.exports = { up, down };
