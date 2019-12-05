const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

exports.signup_user = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(doc => {
            if (doc.length !== 0) {
                res.status(409).json({
                    error: {
                        message: "Email is exists"
                    }
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (!err) {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(doc => {
                                console.log(doc);
                                res.status(201).json(doc);
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    } else {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.delete_user = (req, res, next) => {
    User.remove({_id: req.params._id})
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json({
                message: "User Deleted.",
                user: {
                    _id: req.params._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.login_user = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(doc => {
            if (doc.length === 0) {
                res.status(401).json({
                    message: "Auth Failed."
                });
            }
            bcrypt.compare(req.body.password, doc[0].password, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: doc[0].email,
                            _id: doc[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "2h"
                        }
                    );
                    res.status(200).json({
                        message: "Auth Successful.",
                        token: token
                    });
                } else {
                    res.status(401).json({
                        message: "Auth Failed."
                    });
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};