const Sequelize = require('sequelize');
const { DATABASE_URL } = require('./config');
const { Umzug, SequelizeStorage } = require('umzug');

const sequelize = new Sequelize(DATABASE_URL);

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

const migrationConfig = {
    migrations: { glob: 'migrations/*.js' },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    logger: console,
};

const runMigrations = async () => {
    const migrator = new Umzug(migrationConfig);
    const migrations = await migrator.up();
    console.log('Migrations up tp date', {
        files: migrations.map((m) => m.name),
    });
};

const rollbackMigration = async () => {
    await sequelize.authenticate();
    const migrator = new Umzug(migrationConfig);
    await migrator.down();
};

module.exports = { connectToDatabase, sequelize, rollbackMigration };
