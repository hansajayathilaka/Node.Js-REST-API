const express = require('express');
const app = express();
const productRouters = require('./api/routes/prodects');
const ordersRouters = require('./api/routes/orders');

app.use('/products', productRouters);
app.use('/orders', ordersRouters);

module.exports = app;
