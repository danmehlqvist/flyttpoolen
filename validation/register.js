const Validator = require('validator');
const isEmpty = require('./is-empty');
// import isEmpty from './is-empty.js';



module.exports = function validateRegisterInput(data) {
    let errors = {};

    console.log('running validateRegisterInput i servern');

    // If this doesnt work. Check Lecture 15. Höll på och konvererade till strängar och jävlades.
    if (!data.name) {
        errors.name = 'Please provide a name';
    } else if (!Validator.isLength(data.name, {
            min: 2,
            max: 30
        })) {
        errors.name = 'Name must be between two and 30 characters';
    };

    if (!data.email) {
        errors.email = 'Please provide an email';
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Please provide a valid email';
    }

    if (!data.password) {
        errors.password = 'Please provide a password'
    } else if (!Validator.isLength(data.password, {
            min: 6,
            max: 30
        })) {
        errors.password = 'Password must be minimum 6 characters';
    }

    if (!data.password2) {
        errors.password2 = 'Please confirm your password';
    } else if(data.password!== data.password2){
        errors.password2 = 'Passwords do not match';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}