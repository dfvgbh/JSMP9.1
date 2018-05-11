const router = require('express').Router();
const Log = require('../models/log');

router.get('/', (req, res) => {
    Log.find((err, docs) => {
        if (err) {
            res.sendStatus(500);
            return;
        }

        const logs = docs.map(({ record }) => record);
        res.json(logs)
    });
});

module.exports = router;
