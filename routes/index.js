var express = require('express');
var router = express.Router();

var landing = require('../controllers/index')

/* GET home page. */
router.get('/', landing.get_landing);
router.post('/', landing.post_lead);
router.post('/leads', landing.leads);

module.exports = router;