const router = require('express').Router();
const fetchUrl = require('fetch').fetchUrl;
const Group = require('../models/group');
const Device = require('../models/device');
const Logger = require('../helpers/logger');

router.get('/', async (req, res) => {
  try {
    const docs = await Group.find().exec();
    const groups = await Promise.all(
      docs.map(async (group) => {
        const devices = (await Promise.all(
          group.devices
            .map(id => Device.findById(id).exec())
        )).filter(device => device !== null);

        return {
          id: group._id,
          name: group.name,
          devices: devices.map(({ name }) => name),
          isOn: group.isOn
        }
      })
    );

    res.json(groups)
  } catch(e) {
    Logger.log(e.message);
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  const { groupName, deviceName } = req.body;
  const groupQuery = Group.findOne({ name: groupName });
  const deviceQuery = Device.findOne({ name: deviceName });

  try {
    const device = await deviceQuery.exec();
    if (device === null) {
      Logger.log('No device found');
      res.sendStatus(500);
      return;
    }
    const group = await groupQuery.exec();
    if (group === null) {
      await Group.create({
        name: groupName,
        devices: [device],
        isOn: false
      });
      Logger.log(`Group ${groupName} with ${deviceName} was created`);
      res.sendStatus(201);
    } else {
      await Group.update(
        { _id: group._id },
        { $addToSet: { devices: device } }
      );
      Logger.log(`Device ${deviceName} was added into ${groupName} group`);
      res.sendStatus(200);
    }
  } catch(e) {
    Logger.log(e.message);
    res.sendStatus(500);
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { isOn } = req.body;
  const command = '/cm?cmnd=' + (isOn ? 'Power On' : 'Power off');
  const group = await Group.findById(id);
  const message = `Group ${group.name} is ` + (isOn ? 'On' : 'Off');

  try {
    await Device.update(
      { _id: { $in: group.devices } },
      { isOn : isOn },
      { multi: true }
    );
    group.isOn = isOn;
    await group.save();

    group.devices
      .forEach(async id => {
        const device = await Device.findById(id);
        if (device === null) return;
        fetchUrl(device.ip + command, () => {});
    });

    Logger.log(message);
    res.sendStatus(200);
  } catch (err) {
    Logger.log(err.message);
    res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await Group.findByIdAndRemove(id).exec();
    Logger.log(`Group ${id} was deleted`);
    res.sendStatus(200);
  } catch(e) {
    Logger.log(e.message);
    res.sendStatus(500);
  }
});

module.exports = router;