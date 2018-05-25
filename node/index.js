const express = require('express');
const app = express();
const mongoose = require('mongoose');

const deviceRouter = require('./controllers/device');
const logRouter = require('./controllers/log');
const groupRouter = require('./controllers/group');

mongoose.connect('mongodb://localhost/node-workshop');

app.use(express.json());
app.use('/api/device', deviceRouter);
app.use('/api/log', logRouter);
app.use('/api/group', groupRouter);

app.listen(3001);