const userData = require('../models/user');
const passportAuth = require('../passport_setup');
let bcrypt = require('bcrypt');
const passport = require('passport');
let flash = require('connect-flash');
const { ValidateInput} = require('../utils/validator');

exports.login = function(req, res, next) {
    res.render('user/login', {formData: {}, errors: {}});
}
exports.signup = function(req, res, next) {
    res.render('user/signup', {title: "Registration Page", formData: {}, errors: {}});
}

let rerender_signup = function(errors, req, res, next) {
    res.render('user/signup', {title: "Registration Page", emailErr: req.body["email"], errors: errors});
}

exports.post_login = function(req, res, next) {
    passport.authenticate('local',{
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
}

exports.post_signup = async function(req, res, next) {
    const theEmail = req.body.email
    const thePassword = req.body.password
    const { errors } = ValidateInput(theEmail, thePassword);
    if(errors){
        rerender_signup(errors, req, res, next);
        }
    else{
        let newUser = new userData({
            email: theEmail,
            password: await bcrypt.hash(thePassword, 10)
        })
        newUser.save().then(result=>{
            passport.authenticate('local',{
                successRedirect: '/',
                failureRedirect: '/signup',
                failureFlash: true
            })(req, res, next);
        })
    }
}