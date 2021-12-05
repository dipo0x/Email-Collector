var express = require('express');
var router = express.Router();

var landing = require('../controllers/index');
var user = require('../controllers/user');

router.get('/login', user.login);
router.get('/signup', user.signup);

router.get('/', landing.get_landing);
router.post('/', landing.post_lead);
router.get('/leads', landing.leads);
router.get('/leads/:lead_id', landing.show_lead);
router.get('/leads/:lead_id/edit', landing.edit_lead);
router.post('/leads/:lead_id/edit', landing.post_edit_lead);
router.post('/leads/:lead_id/delete', landing.delete_lead);
router.post('/leads/:lead_id/delete-json', landing.delete_lead_json);

module.exports = router;