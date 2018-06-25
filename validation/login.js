const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    if(!data.name) {
        errors.name='Please provide a user name';
    }

    if (!data.password) {
        errors.password = 'Please provide a password';
    } 

    return {
        errors,
        isValid: isEmpty(errors)
    }
}