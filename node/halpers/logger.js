const Log = require('../models/log');
const Logger = {
    log(msg) {
        Log.create({ record: `${(new Date()).toLocaleTimeString()}: ${msg}` });
    }
};

module.exports = Logger;