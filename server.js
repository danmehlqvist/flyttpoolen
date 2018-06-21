const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./models/User');

const users = require('./routes/users');

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



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Node backend is up and running on port ', PORT);
})