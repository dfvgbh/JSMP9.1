const express = require('express');
const app = express();
const mongoose = require('mongoose');

const deviceRouter = require('./controllers/device');

mongoose.connect('mongodb://localhost/node-workshop');

app.use(express.json());
app.use('/api/device', deviceRouter);

app.listen(3001);