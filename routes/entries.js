const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const Entry = require('../models/Entry');
const keys = require('../config/keys');

router.get('/test',(req,res)=>{
    res.send("hello").status(200);
})


module.exports = router;