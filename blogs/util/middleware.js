const jwt = require('jsonwebtoken');
const { Blog, Session, User } = require('../models');
const { SECRET } = require('./config');

const handledErrors = [
    'TypeError',
    'SequelizeDatabaseError',
    'SequelizeValidationError',
    'SequelizeForeignKeyConstraintError',
    'JsonWebTokenError',
];

const errorHandler = (err, req, res, next) => {
    if (handledErrors.includes(err.name))
        return res.status(400).send({
            error: err.message,
        });

    next(err);
};

// Extract and verify JWT against active Sessions table.
const tokenExtractor = async (req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        try {
            const token = authorization.substring(7);
            req.decodedToken = jwt.verify(token, SECRET);
            const session = await validateToken(token);
            req.session = session;
            next();
        } catch {
            return res.status(401).json({ error: 'token invalid' });
        }
    } else {
        return res.status(401).json({ error: 'token missing' });
    }
};

// Check if token is valid (has not been blacklisted in Sessions table)
const validateToken = async (token) => {
    const session = await Session.findOne({ where: { token } });
    if (!session || session.expired) throw Error;
    return session;
};

// Find user by token
const userExtractor = async (req, res, next) => {
    if (!req.decodedToken) {
        return next(new Error('token missing or invalid'));
    }
    req.user = await User.findByPk(req.decodedToken.id);

    next();
};

// Find blog by id parameter
const blogFinder = async (req, res, next) => {
    try {
        req.blog = await Blog.findByPk(req.params.id);
        if (!req.blog) {
            return res.status(400).json({ error: 'Blog not found' });
        }
        
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor,
    blogFinder,
};
