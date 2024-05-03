const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('express-async-errors');

const User = require('../models/user');
const { SECRET } = require('../util/config');

router.post('/', async (req, res) => {
    const user = await User.findOne({ where: { username: req.body.username } });

    const passwordCorrect = req.body.password === 'secret';

    if (!(user && passwordCorrect))
        return res.status(401).json({
            error: 'invalid username or password',
        });

    const userForToken = {
        username: user.username,
        id: user.id,
    };

    const token = jwt.sign(userForToken, SECRET);

    res.status(200).send({
        token,
        username: user.username,
        name: user.name,
    });
});

module.exports = router;
