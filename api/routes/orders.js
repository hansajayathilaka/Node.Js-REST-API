const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Show Orders.',
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Make Order.',
    });
});

router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Delete Order.',
        id: req.params.id,
    });
});

module.exports = router;
