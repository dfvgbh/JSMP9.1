var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var NOTES_PATH = path.join(__dirname, '../models/notes.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile(NOTES_PATH, (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
    res.send(notes);
  });
});

router.delete('/', (req, res, next) => {
  const id = parseInt(req.query.id, 10);

  if (isNaN(id)) {
    res.sendStatus(404);
    return;
  }

  fs.readFile(NOTES_PATH, (err, data) => {
    if (err) throw err;

    var notes = JSON.parse(data);
    var filteredNotes = notes.filter(note => note.id !== id);

    if (filteredNotes.length === notes.length) {
      res.sendStatus(404);
      return;
    }

    const resultData = JSON.stringify(filteredNotes, null, 1);

    fs.writeFile(NOTES_PATH, resultData, err => {
      if (err) throw err;
      res.sendStatus(200);
    });
  });
});


router.post('/', (req, res, next) => {
  const body = req.body;

  fs.readFile(NOTES_PATH, (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    body.id = notes[notes.length - 1].id + 1;
    body.isDone = false;
    notes.push(body);

    const result = JSON.stringify(notes, null, 1);

    fs.writeFile(NOTES_PATH, result, err => {
      if (err) throw err;
      res.sendStatus(200);
    });
  });
});


router.put('/', (req, res, next) => {
  const body = req.body;

  fs.readFile(NOTES_PATH, (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const target = notes.find(note => note.id === body.id);

    Object.assign(target, body);

    const result = JSON.stringify(notes, null, 1);

    fs.writeFile(NOTES_PATH, result, err => {
      if (err) throw err;
      res.sendStatus(200);
    });
  });
});

module.exports = router;
