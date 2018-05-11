const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    record: String
});

module.exports = mongoose.model('Log', logSchema);
