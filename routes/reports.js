const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwt_decode = require('jwt-decode');
const moment = require('moment');

const Report = require('../models/Report');
const keys = require('../config/keys');

const validateEntryInput = require('../validation/report');

const private = passport.authenticate('jwt', {
    session: false
});

// @route DELETE api/reports/:id
// @desc For deleting a route
// @access Private
router.delete('/:id', private, (req, res) => {
    const token = req.get('Authorization').slice(7);
    const userId = jwt_decode(token).id;
    Report.deleteOne({
        _id: req.params.id,
        userId
    }).then((report) => {
        res.json(report);
    }).catch(errors => {
        res.send(400).json(errors);
    })
});


// @route POST api/reports
// @desc For adding a new entry
// @access Private
router.post('/', private, (req, res) => {
    const {
        errors,
        isValid
    } = validateEntryInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newEntry = new Report({
        userId: req.body.userId,
        date: req.body.date,
        hours: req.body.hours,
        customer: req.body.customer,
        comments: req.body.comments,
        start: req.body.start,
        end: req.body.end,
        break: req.body.breakTime
    })

    newEntry.save()
        .then(entry => res.json(entry))
        .catch(error => res.status(500).json(error));
})

// @route   GET api/reports/:id
// @desc    Get a Report with a given id
// @access  Private
router.get('/:id', private, (req, res) => {
    const token = req.get('Authorization').slice(7);
    const userId = jwt_decode(token).id;
    Report.findById(req.params.id)
        .then((report) => {
                if (!report) {
                    return res.sendStatus(404);
                }
                if (userId !== String(report.user)) {
                    return res.status(401).json({
                        errors: 'This report does not belong to you!'
                    });
                }
                res.json(report);
            }

        );
})

// @route   GET api/reports/?startDate=<STARTDATE>&endDate=<ENDDATE>
// @desc    Get the reports dated between STARTDATE and ENDATE
// @query   STARTDATE and ENDDATE should be of the format YYYYMMDD
// @access  Private
router.get('/', private, (req, res) => {
    req;
    const token = req.get('Authorization').slice(7);
    const userId = jwt_decode(token).id;

    // Convert query parameters to ms
    const startDate = moment(req.query.startDate).valueOf();
    const endDate = moment(req.query.endDate).valueOf();

    if (endDate <= startDate) {
        return res.status(400).json({
            errors: 'startDate can not be after the endDate'
        })
    }
    Report.find({
            userId: userId,
            date: {
                $gte: startDate,
                $lte: endDate
            }

        }).then(reports => {
            if (!reports) {
                return res.status(404).json({
                    errors: `No work reports found in the specified interval (${req.query.startDate} to ${req.query.endDate}`
                });
            }
            res.json(reports);
        })
        .catch(error => {
            res.status(500).json({
                errors: "Couldn't make request to database :("
            });
        });

})

module.exports = router;