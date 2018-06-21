const Validator = require('validator');
const isEmpty = require('./is-empty');
// import isEmpty from './is-empty.js';



module.exports = function validateLoginInput(data) {
    let errors = {};

    // if (!data.email) {
    //     errors.email = 'Please provide a email';
    // } else 

    if (!data.email || !Validator.isEmail(data.email)) {
        errors.email = 'Please provide a valid email';
    }

    if (!data.password) {
        errors.password = 'Please provide a password'
    } 

    console.log('validation login');

    return {
        errors,
        isValid: isEmpty(errors)
    }
}