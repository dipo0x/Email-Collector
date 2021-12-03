var express = require('express');
var router = express.Router();

var landing = require('../controllers/index');

/* GET home page. */
router.get('/', landing.get_landing);
router.post('/', landing.post_lead);
router.get('/leads', landing.leads);
router.get('/leads/:lead_id', landing.show_lead);
router.get('/leads/:lead_id/edit', landing.edit_lead);
router.post('/leads/:lead_id/edit', landing.post_edit_lead);

module.exports = router;