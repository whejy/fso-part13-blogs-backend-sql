const router = require('express').Router();
require('express-async-errors');
const { ReadingList } = require('../models');

router.post('/', async (req, res) => {
    const list = await ReadingList.create({...req.body})
    res.json(list)
});

module.exports = router;
