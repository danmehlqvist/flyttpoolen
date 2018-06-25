const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ReportSchema = new Schema({
    userId: {
        type: ObjectId,
        isRequired: true
    },
    date: {
        type: Number,
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

module.exports = Report = mongoose.model('reports', ReportSchema);