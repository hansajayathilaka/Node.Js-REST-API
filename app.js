const express = require('express');
const app = express();
const productRouters = require('./api/routes/prodects');

app.use('/products', productRouters);

module.exports = app;