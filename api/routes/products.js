const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5},
    fileFilter: fileFilter
});

const Product = require('../models/products');

// View All
router.get('/', (req, res, next) => {
    Product.find()
        .select('_id name price imgPath')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        imgPath: doc.imgPath,
                        request: {
                            type: "GET",
                            url: "http://127.0.0.1:3000/products/" + doc._id
                        }
                    }
                })
            };
            console.log(response);
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

// Create prodect
router.post('/', upload.single('image'), (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        imgPath: req.file.path
    });
    product.save()
        .then(result =>{
            console.log(result);
            res.status(201).json({
                message: 'Product is Created Successfully.',
                product: {
                    _id: result._id,
                    name: result.name,
                    price: result.price,
                    imgPath: result.imgPath
                },
                request: {
                    type: "GET",
                    url: "http://127.0.0.1:3000/products/" + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });


});

// View a Single product
router.get('/:id', (req, res, next) => {
    const _id = req.params.id;
    Product.findById(_id)
        .select('_id name price imgPath')
        .exec()
        .then(doc => {
            const response = {
                product: doc,
                request: {
                    type: "GET",
                    disc: "Back to all Products.",
                    url: "http://127.0.0.1:3000/products"
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
            res.status(500).json({error: err});
        });
});

// View Update
router.patch('/:_id', (req, res, next) => {
    const _id = req.params._id;
    var updateOps = {};

    req.body.forEach(ops => {
        updateOps[ops['propName']] = ops['value'];
    });

    Product.update({_id: _id}, {$set: updateOps})
        .exec()
        .then(() => {
            const response ={
                message: "Product is Updated.",
                product: {
                    _id: _id
                },
                request: {
                    type: "GET",
                    url: "http://127.0.0.1:3000/products/" + _id
                }
            };
            console.log(response);
            res.status(202).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

// Delete product
router.delete('/:_id', (req, res, next) => {
    const _id = req.params._id;
    Product.remove({_id: _id})
        .exec()
        .then(() => {
            const response = {
                message: "Product is Deleted.",
                product: {
                    _id: _id
                },
                request: {
                    type: "GET",
                    url: "http://127.0.0.1:3000/products/"
                }
            };
            console.log(response);
            res.status(202).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

module.exports = router;
