const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/User');
const keys = require('../config/keys');

//Load input validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');


// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

// @route   GET api/users/login
// @desc    Login User / Returning token
// @access  Public
router.post('/login', (req, res) => {
    const {
        errors,
        isValid
    } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const name = req.body.name;
    const password = req.body.password;

    // Find user by name
    User.findOne({
        name
    }).then(user => {

        if (!user) {
            errors.name = 'User not found';
            return res.status(404).json(errors);
        }

        // Check password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    //Generate token
                    const payload = {
                        id: user.id,
                        name: user.name
                    };
                    jwt.sign(
                        payload,
                        keys.secretKey, {
                            expiresIn: 3600
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        });
                } else {
                    errors.password = 'Password incorrect';
                    return res.status(400).json(errors);
                }
            })
    })

});

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get('/test', (req, res) => {
    res.json({
        msg: "Users works"
    });
});

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
        name: req.body.name
    }).then(user => {
        if (user) {
            errors.name = 'User already exists';
            return res.status(400).json(errors);
        } else { // No user found with identical username
            const newUser = new User({
                name: req.body.name,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        res.sendStatus(500);
                    }
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => {
                            res.sendStatus(500); // MY OWN COMMENT!!!
                        })
                })
            });
        }
    })
});


module.exports = router;