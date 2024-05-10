const router = require('express').Router();
require('express-async-errors');
const { User, Blog } = require('../models');

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
                    where,
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

router.put('/:username', async (req, res) => {
    const updatedUser = await User.findOne({
        where: { username: req.params.username },
    });
    if (updatedUser) {
        try {
            updatedUser.username = req.body.username;
            await updatedUser.save();
            return res.status(200).json(updatedUser);
        } catch (err) {
            next(err);
        }
    }
    return res
        .status(400)
        .json({ message: `username ${req.params.username} not found` });
});

module.exports = router;
