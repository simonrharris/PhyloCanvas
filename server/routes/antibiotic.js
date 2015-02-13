var express = require('express');
var router = express.Router();

var antibioticModel = require('models/antibiotic');

var logger = require('utils/logging').createLogger('Antibiotic Ctrl');

router.get('/api/all-antibiotics', function (req, res) {
  antibioticModel.getAll(function (error, antibiotics) {
    if (error) {
      logger.error(error, antibiotics);
      return res.sendStatus(500);
    }
    res.json(antibiotics);
  });
});

module.exports = router;