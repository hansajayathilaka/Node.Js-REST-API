const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Products Show.',
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Create Product.',
    });
});

router.patch('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Update Product',
        id: req.params.id,
    });
});

module.exports = router;