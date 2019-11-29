const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products');

// View All
router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc.length > 0) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No Entry Found'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

// Create prodect
router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save()
        .then(result =>{
            console.log(result);
            res.status(201).json({
                message: 'Create Product.',
                product: product
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });


});

// View a Single product
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log("From Database" + doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: 'No valid Entry Found!'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

// View Update
router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    // var updateOps = {};
    // for (const ops in req.body){
    //     updateOps[ops.propName] = ops.value;
    // }
    Product.update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

// Delete product
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.remove({_id: id})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

module.exports = router;
