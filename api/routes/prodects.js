const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Responce for the GET Request in /products',
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Responce for the POST Request in /products',
    });
});

module.exports = router;