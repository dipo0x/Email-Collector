var express = require('express');
var router = express.Router();
var landing = require('../controllers/index')

/* GET home page. */
router.get('/', landing);

module.exports = router;
