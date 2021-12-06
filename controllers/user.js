const userData = require('../models/user')
const passportAuth = require('../passport_setup')
let bcrypt = require('bcrypt')
const passport = require('passport')
let flash = require('connect-flash');

exports.login = function(req, res, next) {
    res.render('user/login', {formData: {}, errors: {}});
}
exports.signup = function(req, res, next) {
    res.render('user/signup', {title: "Registration Page", formData: {}, errors: {}});
}
exports.post_login = function(req, res, next) {
    passport.authenticate('local',{
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
}

exports.post_signup = async function(req, res, next) {
    let newUser = new userData({
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10)
    })
    newUser.save().then(result=>{
        passport.authenticate('local',{
            successRedirect: '/',
            failureRedirect: '/signup',
            failureFlash: true
        })(req, res, next);
    })
}
