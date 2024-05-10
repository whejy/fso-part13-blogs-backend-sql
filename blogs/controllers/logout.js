const router = require('express').Router();
require('express-async-errors');

const { tokenExtractor } = require('../util/middleware');

router.delete('/', tokenExtractor, async (req, res) => {
    try {
        await req.session.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: 'could not logout, try again' });
    }
});

module.exports = router;
