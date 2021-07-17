// node modules

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

// import routes
const authRoute = require('./routes/auth');

//connect to database

dotenv.config();

mongoose.connect(
    // eslint-disable-next-line no-undef
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected to database')
);

// middlewares

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(compression());
app.use(helmet());

//route middleware

app.use('/api/users', authRoute);

//start

app.listen(3001, () => console.log('server up and running'));
