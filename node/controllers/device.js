const router = require('express').Router();
const Device = require('../models/device');
const fetchUrl = require('fetch').fetchUrl;

router.get('/', (req, res) => {
    Device.find((err, docs) => {
        if (err) {
            res.sendStatus(500);
            return;
        }

        const devices = docs.map(doc => ({
            id: doc._id,
            name: doc.name,
            ip: doc.ip,
            isOn: doc.isOn
        }));
        res.json(devices)
    });
});

router.post('/', async (req, res) => {
    const device = req.body;

    await Device.create({
        name: device.name,
        ip: device.ip,
        isOn: false
    });

    res.sendStatus(201);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await Device.findByIdAndRemove(id).exec();
        res.sendStatus(200);
    } catch(e) {
        res.sendStatus(500);
    }
});

router.put('/:id', async (req, res) => {
    const { id }  = req.params;
    const { isOn }  = req.body;
    const device = await Device.findById(id);
    const command = '/cm?cmnd=' + (isOn ? 'Power On' : 'Power off');

    fetchUrl(device.ip + command, async (error, meta, body) => {
        device.isOn = isOn;
        await device.save();
        res.sendStatus(200);
    });
});

module.exports = router;
