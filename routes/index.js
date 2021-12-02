var express = require('express');
var router = express.Router();

var landing = require('../controllers/index')

/* GET home page. */
router.get('/', landing.get_landing);
router.post('/', landing.post_lead);
router.get('/leads', landing.leads);
router.get('/leads/:lead_id', landing.show_lead);

module.exports = router;