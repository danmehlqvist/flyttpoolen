const express = require('express');


const app = express();




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Node backend is up and running on port ', PORT);
})