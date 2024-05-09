const router = require('express').Router();
require('express-async-errors');
const { User, Blog } = require('../models');

const userFinder = async (req, res, next) => {
    req.user = await User.findOne({ where: { username: req.params.username } });
    next();
};

router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: {
                exclude: ['userId'],
            },
        },
    });
    res.json(users);
});

router.get('/:id', async (req, res) => {
    const where = {};
    if (req.query.read) {
        where.read = req.query.read;
    }

    const user = await User.findByPk(req.params.id, {
        include: [
            {
                model: Blog,
                attributes: {
                    exclude: ['userId'],
                },
            },
            {
                model: Blog,
                as: 'readings',
                attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
                through: {
                    attributes: ['read', 'id'],
                    where
                },
            },
        ],
    });

    if (user) {
        res.json(user);
    } else {
        res.status(404).end();
    }
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
