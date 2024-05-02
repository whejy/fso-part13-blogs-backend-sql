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

module.exports = errorHandler;
