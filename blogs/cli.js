require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);

const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established.');
        await printBlogs();
        sequelize.close();
    } catch (error) {
        console.error('Unable to connect to database:', error);
    }
};

async function printBlogs() {
    const blogs = await sequelize.query('SELECT * FROM blogs', {
        type: QueryTypes.SELECT,
    });
    return console.log(blogs);
}

main();
