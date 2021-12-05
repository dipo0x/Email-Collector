const userData = require('../models/user')

exports.login = function(req, res, next) {
    res.render('user/login', {formData: {}, errors: {}});
}
exports.signup = function(req, res, next) {
    res.render('user/signup', {title: "Registration Page", formData: {}, errors: {}});
}