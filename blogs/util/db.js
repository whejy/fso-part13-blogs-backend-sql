const Sequelize = require('sequelize');
const { DATABASE_URL } = require('./config');
const { Umzug, SequelizeStorage } = require('umzug');

const sequelize = new Sequelize(DATABASE_URL);

const runMigrations = async () => {
    const migrator = new Umzug({
        migrations: { glob: 'migrations/*.js' },
        context: sequelize.getQueryInterface(),
        storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
        logger: console,
    });

    const migrations = await migrator.up();
    console.log('Migrations up tp date', {
        files: migrations.map((m) => m.name),
    });
};

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        await runMigrations();
        console.log('Database connection established.');
    } catch (error) {
        console.error('Unable to connect to database:', error);
        return process.exit(1);
    }

    return null;
};

module.exports = { connectToDatabase, sequelize };
