require('dotenv').config();
const express = require('express');

const blogsRouter = require('./routes/api')

const app = express();

app.use(express.json())

app.use('/api/blogs', blogsRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
// const main = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Database connection established.');
//         await printBlogs();
//         sequelize.close();
//     } catch (error) {
//         console.error('Unable to connect to database:', error);
//     }
// };

// async function printBlogs() {
//     const blogs = await sequelize.query('SELECT * FROM blogs', {
//         type: QueryTypes.SELECT,
//     });
//     return console.log(blogs);
// }

// main();