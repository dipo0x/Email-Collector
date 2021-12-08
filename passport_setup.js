const userData = require('./models/user');
let LocalStrategy = require('passport-local').Strategy;
let bcyrpt = require('bcrypt')

const validPassword = function(user, password){
    return bcyrpt.compareSync(password, user[0].password);
}

module.exports = function(passport){
    passport.serializeUser(function(user, done){
        done(null, user)
    });
    passport.deserializeUser(function(id, done){
        userData.find({ ID: id }).then(user=>{
            if (user == null){
                done(new Error("Wrong user ID"))
            }
            done(null, user);
        })
    })
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField : 'password',
        passReqToCallback: true
    },
    function(req, email, password, done){
        console.log(email)
        userData.find({ email: email}).then(user=>{
            console.log(" This is the user", user)
            if (user.length==0){
                console.log('message', 'Incorrect email')
                return done(null, false)
            }
            else if(user[0].password == null || user[0].password == undefined){
                console.log('message', 'You must reset your password')
                return done(null, false)
            }
            else if(!validPassword(user, req.body.password)){
                console.log('message', 'Incorrect password')
                return done(null, false)
            }
            return done(null, user)
        }).catch(err => {
            done(err, false)
        })
    }))
}    