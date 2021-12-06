const userData = require('./models/user');
let LocalStrategy = require('passport-local').Strategy;
let bcyrpt = require('bcrypt')

const validPassword = function(user, password){
    return bcyrpt.compareSync(password, user.password);
}
module.exports = function(passport){
    passport.serializeUser(function(user, done){
        done(null, user.id)
    });
    passport.deserializeUser(function(id, done){
        console.log(id)
        userData.findById({ id }).then(user=>{
            if (user == null){
                done(new Error("Wrong user ID"))
            }
            done(null, user);
        })
    })
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField : 'password',
        passReqToCallback: true,
    },
    function(req, email, password, done){
        userData.find({ email: email}).then(user=>{
            if (user==null){
                req.flash('message', 'Incorrect credentials')
                return done(null, false)
            }
            else if(user.password == null || user.password == undefined){
                req.flash('message', 'You must reset your password')
                return done(null, false)
            }
            else if(!validPassword(user, password)){
                req.flash('message', 'Incorrect password')
                return done(null, false)
            }
            return done(null, user)
        }).catch(err => {
            done(err, false)
        })
    }))
}    