
const express = require('express');
const app = express(); //express function object
require('dotenv').config(); //to access process files
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8000;   //use of prosess file
const authRoute = require('./routes/authRoute');
const todoRoute = require('./routes/todoRoute');

//------------------------------------------------------------------------
app.use(cors());  //app.use() is used to write express middlwere that u want to run between request & responserequest handler
app.use(express.json());  //we will be sending data from frontend in form of json and store in DB. to understand we need to use this middlewere


app.use(authRoute);
app.use(todoRoute);

mongoose.connect(process.env.DB_URL)//this is how to connect to mongoDB
    .then(() => {
        console.log("MongoDB is connected");
    })
    .catch(err => {
        console.log(err);
    });
console.log(process.env.DB_URL);


app.listen(PORT, () => {
    // we can run call back fuc^n when it runs
    console.log(`Server started successfully on Port ${PORT}`)

})


