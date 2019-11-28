const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRouters = require('./api/routes/prodects');
const ordersRouters = require('./api/routes/orders');

app.use(morgan(('dev')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routers Which should Handle request
app.use('/products', productRouters);
app.use('/orders', ordersRouters);

// 404 Error handler
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Handle All errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

module.exports = app;
