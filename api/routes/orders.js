const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/orders');
const Product = require('../models/products');

router.get('/', (req, res, next) => {
    Order.find()
        .select('_id product quantity')
        .populate('product', 'name')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                order: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: "GET",
                            url: "http://127.0.0.1:3000/orders/" + doc._id
                        }
                    };
                })
            };
            console.log(response);
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    const productId = req.body.product;
    Product.findById(productId)
        .then(() => {
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                product: req.body.product,
                quantity: req.body.quantity
            });
            return order.save();
        })
        .then(doc => {
            const response = {
                message: "Order is Saved Successfully.",
                order: {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity
                },
                request: {
                    type: "GET",
                    url: "http://127.0.0.1:3000/orders/" + doc._id
                }
            };
            console.log(response);
            res.status(201).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:_id', (req, res, next) => {
    const _id = req.params._id;
    Order.findById(_id)
        .select('_id product quantity')
        .exec()
        .then(doc => {
            const response = {
                order: doc,
                request: {
                    type: "GET",
                    description: "Back to Orders",
                    url: "http://127.0.0.1:3000/orders"
                }
            };
            console.log(response);
            if (doc) {
                res.status(200).json(response);
            } else {
                res.status(404).json({message: 'No valid Entry Found!'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:_id', (req, res, next) => {
    const _id = req.params._id;

    Order.remove({_id: _id})
        .exec()
        .then((doc) => {
            const response = {
                message: "Order is Deleted Successfully.",
                order: {
                    _id: _id
                },
                request: {
                    type: "GET",
                    description: "Back to Orders",
                    url: "http://127.0.0.1:3000/orders"

                }
            };
            console.log(response);
            res.status(202).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
