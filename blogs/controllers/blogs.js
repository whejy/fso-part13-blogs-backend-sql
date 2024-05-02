const router = require('express').Router();
require('express-async-errors');
const { Blog } = require('../models');

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id);
    next();
};

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll();
    res.json(blogs);
});

router.post('/', async (req, res) => {
    const newBlog = await Blog.create(req.body);
    res.json(newBlog);
});

router.delete('/:id', blogFinder, async (req, res) => {
    await req.blog.destroy();
    return res.status(204).end();
});

router.put('/:id', blogFinder, async (req, res) => {
    if (req.body.likes) {
        req.blog.likes = req.body.likes;
        await req.blog.save();
    }
    res.json(req.blog);
});

module.exports = router;
