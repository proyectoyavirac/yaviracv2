var Persona = require('./models/todo');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond and resource');
});

/*
router.get('/register', function (req, res) {
  Persona.find(function (err, personas) {
      if (err) {
          res.send(err);
      }
      res.json(personas);
  });
});

*/

router.post('/register', function (req, res) {
    Persona.create(req.body, function (err, personas) {
        if (err) {
            res.send(err);
        } else {
            console.log(personas);
            res.json(personas);
        }
    });
});

module.exports = router;
