var express = require('express');
var router = express.Router();
var index = require('../controllers/index')

/* GET home page. */
router.get('/', index);

module.exports = router;
