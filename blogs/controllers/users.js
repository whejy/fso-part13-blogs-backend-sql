const router = require('express').Router();
require('express-async-errors');
const { User, Blog } = require('../models');

const userFinder = async (req, res, next) => {
    req.user = await User.findOne({ where: { username: req.params.username } });
    next();
};

router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: Blog
    });
    res.json(users);
});

router.post('/', async (req, res) => {
    const newUser = await User.create(req.body);
    res.json(newUser);
});

router.put('/:username', userFinder, async (req, res) => {
    if (req.body.username) {
        req.user.username = req.body.username;
        await req.user.save();
    }
    res.json(req.user);
});

module.exports = router;
