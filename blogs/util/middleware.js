const jwt = require('jsonwebtoken');
const { Blog } = require('../models')
const { SECRET } = require('./config');

const handledErrors = [
    'TypeError',
    'SequelizeDatabaseError',
    'SequelizeValidationError',
];

const errorHandler = (err, req, res, next) => {
    if (handledErrors.includes(err.name))
        return res.status(400).send({
            error: err.message,
        });

    next(err);
};

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        try {
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
        } catch {
            return res.status(401).json({ error: 'token invalid' });
        }
    } else {
        return res.status(401).json({ error: 'token missing' });
    }

    next();
};

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id);

    next();
};

module.exports = { errorHandler, tokenExtractor, blogFinder };
