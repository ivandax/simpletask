// node modules

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// import routes
const authRoute = require('./routes/auth');

//connect to database

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected to database')
);

// middlewares

app.use(express.json());

//route middleware

app.use('/api/users', authRoute);

//start

app.listen(3001, () => console.log('server up and running'));
