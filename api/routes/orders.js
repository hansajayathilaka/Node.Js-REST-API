const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');
const OrdersController = require('../controllers/orders');

router.get('/', checkAuth, OrdersController.get_all_orders);
router.post('/', checkAuth, OrdersController.create_order);
router.get('/:_id', checkAuth, OrdersController.get_one_order);
router.delete('/:_id', checkAuth, OrdersController.delete_order);

module.exports = router;
