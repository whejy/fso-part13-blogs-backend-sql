const router = require('express').Router();
require('express-async-errors');
const { Blog } = require('../models');
const { sequelize } = require('../util/db');

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll({
        attributes: [
            'author',
            [sequelize.fn('count', sequelize.col('id')), 'articles'],
            [sequelize.fn('sum', sequelize.col('likes')), 'likes'],
        ],
        group: ['author'],
        order: [['likes', 'DESC']],
    });
    res.json(blogs);
});

module.exports = router;
