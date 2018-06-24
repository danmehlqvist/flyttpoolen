const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    date: {
        type: String,
        isRequired: true
    },
    start: {
        type: Number,
        isRequired: false
    },
    end: {
        type: Number,
        isRequired: false
    },
    break: {
        type: Number,
        isRequired: false
    },
    hours: {
        type: Number,
        isRequired: true
    },
    customer: {
        type: String,
        isRequired: true
    },
    comments: {
        type: String,
        isRequired: true
    }

});

module.exports = Entry = mongoose.model('entries', EntrySchema);