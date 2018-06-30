const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
require('./models/User');
require('./models/Report');

const users = require('./routes/users');
const reports = require('./routes/reports');

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;
// Connect to mongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.error(err))



app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/reports', reports);

// Serve static assests if in production
if( process.env.NODE_ENV==='production'){
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Node backend is up and running on port ', PORT);
})