const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Show Orders.'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message: 'Make Order.',
        order: order
    });
});

router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Delete Order.',
        id: req.params.id,
    });
});

module.exports = router;
