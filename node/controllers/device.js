const router = require('express').Router();
const Device = require('../models/device');
const request = require('request');
const Logger = require('../helpers/logger');

router.get('/', (req, res) => {
    Device.find((err, docs) => {
        if (err) {
            Logger.log(err.message);
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

    Logger.log('New device was created');

    res.sendStatus(201);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await Device.findByIdAndRemove(id).exec();
        Logger.log(`Device ${id} was deleted`);
        res.sendStatus(200);
    } catch(e) {
        Logger.log(e.message);
        res.sendStatus(500);
    }
});

router.put('/:id', async (req, res) => {
    const { id }  = req.params;
    const { isOn }  = req.body;
    const device = await Device.findById(id);
    const command = '/cm?cmnd=' + (isOn ? 'Power On' : 'Power off');
    const message = `Device ${device.name} is ` + (isOn ? 'On' : 'Off');

  console.log(device.ip + command);
  request(`${device.ip}${command}`, async (error, response, body) => {
        error && console.log(error);
        device.isOn = isOn;
        await device.save();
        await Logger.log(message);
        res.sendStatus(200);
    });
});

module.exports = router;
