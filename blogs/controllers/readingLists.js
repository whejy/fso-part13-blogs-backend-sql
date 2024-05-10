const router = require('express').Router();
require('express-async-errors');
const { ReadingList } = require('../models');
const { tokenExtractor } = require('../util/middleware');

router.post('/', async (req, res) => {
    const list = await ReadingList.create({ ...req.body });
    res.json(list);
});

router.put('/:id', tokenExtractor, async (req, res) => {
    const readingListBlog = await ReadingList.findByPk(req.params.id);

    if (!readingListBlog)
        return res.status(404).json({
            error: `Reading list with id ${req.params.id} not found`,
        });

    if (readingListBlog.userId !== req.decodedToken.id)
        return res.status(401).json({
            error: 'User not authorized to edit this reading list',
        });

    if (typeof req.body.read === 'boolean') {
        readingListBlog.read = req.body.read;
        await readingListBlog.save();
    }
    res.json(readingListBlog);
});

module.exports = router;
