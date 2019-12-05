const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRouters = require('./api/routes/products');
const orderRouters = require('./api/routes/orders');
const userRouters = require('./api/routes/users');

const pass = process.env.MONGO_ATLES_PASS;
const db = process.env.MONGO_ATLES_DB;
const url = 'mongodb+srv://Hansa:' + pass + '@hansa-mongodb-avqh4.mongodb.net/' + db + '?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true });

// This is for "(node:17874)"
mongoose.Promise = global.Promise;

app.use(morgan(('dev')));

// For Static Files
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Origin',
        '*'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method == 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'GET, PUT, POST, PATCH, DELETE'
        );
        return res.status(200). json({});
    }
    next();
});

// Routers Which should Handle request
app.use('/products', productRouters);
app.use('/orders', orderRouters);
app.use('/users', userRouters);

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
