const Log = require('../models/log');
const Logger = {
    log(msg) {
        Log.create({ record: `${(new Date()).toLocaleString()}: ${msg}` });
    }
};

module.exports = Logger;