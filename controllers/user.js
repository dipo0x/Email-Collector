const userData = require('../models/user');
const passportAuth = require('../passport_setup');
let bcrypt = require('bcrypt');
const passport = require('passport');
let flash = require('connect-flash');
const {validateRegisterInput, validateUser} = require('../utils/validator');

////FUNCTIONS FOR THIS FILE ALONE/////
let rerender_signup = function(errors, req, res, next) {
    res.render('user/signup', {title: "Registration Page", emailErr: req.body["email"], errors: errors});
}
/////////////

exports.login = function(req, res, next) {
    res.render('user/login', {formData: {}, errors: {}});
}
exports.signup = function(req, res, next) {
    res.render('user/signup', {title: "Registration Page", formData: {}, errors: {}, theErrors: {}});
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
    const { errors, valid } = validateRegisterInput(theEmail, thePassword);
    const { theErrors, isValid } = validateUser(theEmail, next);
    if(!valid  || !isValid){
        rerender_signup(theErrors, errors, req, res, next);
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