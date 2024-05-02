const express = require('express');
const Blog = require('../models/Blog')

const router = express.Router()

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll();
    console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs);
})

router.post('/', async (req, res) => {
    const { author, url, title } = req.body;
    try {
        const newBlog = await Blog.create({ author, url, title });
        console.log(JSON.stringify(newBlog, null, 2));
        res.json(newBlog);
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ error: 'Failed to create blog' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const blogToDelete = await Blog.findByPk(id);
    if (blogToDelete) {
        await blogToDelete.destroy();
        return res.json({ message: `Successfully deleted blog id: ${id}` });
    }
    return res.status(400).json({ error: `Blog with id ${id} not found` });
});

module.exports = router