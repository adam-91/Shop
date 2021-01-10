const express = require('express');
const { check, body }  = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');
const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.get('/reset', authController.getReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/login', [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
    body('password','Password should be longer the 8 sign')
    .isLength({min: 8})
    .trim()
],authController.postLogin);

router.post(
    '/signup', 
    check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom((value, { req}) => {
        return User.findOne({ email: value })
            .then(userDoc => {
                if (userDoc) {
                    return Promise.reject('Email already in use.');
                }
            });
    })
    .normalizeEmail(),
    body('password','Password should be at least 8 symbols and special sign')
    .isLength({min: 8})
    .isAlphanumeric()
    .trim(),
    body('confirmPassword')
    .trim()
    .custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Password have to much!');
        } else {
            return true;
        }
    }),
    authController.postSignup
);

router.post('/logout', authController.postLogout);

router.post('/reset', authController.postReset);

router.post('/new-password', authController.postNewPassword);

module.exports = router;