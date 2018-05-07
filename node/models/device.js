const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    name: String,
    ip: String,
    isOn: Boolean
});

module.exports = mongoose.model('Device', deviceSchema);
