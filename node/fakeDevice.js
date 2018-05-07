const express = require('express');
const app = express();

const port = parseInt(process.argv[2], 10);

app.get('/cm', (req, res) => {
    const cmnd = req.query.cmnd;

    if (cmnd === 'Power On') {
        console.log('On');
    }

    if (cmnd === 'Power off') {
        console.log('Off');
    }

    res.sendStatus(200);
});

app.listen(port, err => {
    !err && console.log(`Fake device is listening on 127.0.0.1:${port}`);
});
