var express = require('express');
var router = express.Router();
var data = require('../controllers/Data.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello world - Personas',users: data.getNames() });
});

module.exports = router;
