const express = require('express');
const cors = require('cors');

const usersRouter = require('./routes/user.route')

const app = express();

app.use(cors({
    origin: 'http://localhost:5000',
}));

app.use(express.json());

app.use('/users', usersRouter);

module.exports = app;
