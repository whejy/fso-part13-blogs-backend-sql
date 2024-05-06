const router = require('express').Router();
const { Op } = require('sequelize');
require('express-async-errors');
const { Blog, User } = require('../models');
const { blogFinder } = require('../util/middleware');

router.get('/', async (req, res) => {
    const where = {};
    if (req.query.search) {
        where[Op.or] = [
            { title: { [Op.iLike]: '%' + req.query.search + '%' } },
            { author: { [Op.iLike]: '%' + req.query.search + '%' } },
        ];
    }

    const blogs = await Blog.findAll({
        attributes: {
            exclude: ['userId'],
        },
        include: {
            model: User,
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        },
        order: [['likes', 'DESC']],
        where,
    });
    res.json(blogs);
});

router.post('/', async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id);
    const newBlog = await Blog.create({ ...req.body, userId: user.id });
    res.json(newBlog);
});

router.delete('/:id', blogFinder, async (req, res) => {
    const loggedInUser = await User.findByPk(req.decodedToken.id);

    if (!(loggedInUser && loggedInUser.id === req.blog.userId))
        return res.status(401).json({
            error: 'User not authorized to delete blog',
        });

    await req.blog.destroy();
    return res
        .status(200)
        .json({ message: `Blog deleted (id: ${req.params.id})` });
});

router.put('/:id', blogFinder, async (req, res) => {
    if (req.body.likes) {
        req.blog.likes = req.body.likes;
        await req.blog.save();
    }
    res.json(req.blog);
});

module.exports = router;
