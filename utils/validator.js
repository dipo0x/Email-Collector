const userData = require('../models/user')
const validator = require('validator');

module.exports.validateRegisterInput = (email, password) => {
	const errors = {};
	if (!validator.isEmail(email)){
		errors["email"] = "Not a valid email address";
		}
	if(!validator.isAscii(password) === ''){
		errors["password"] = "Not a valid password";	
		}
	if(!validator.isLength(password, {min:4, max: 12})){
		errors["password"] = "Password ensure that your password has a minimum of 4 char and maximum of 12 char";	
	}
	return{
		errors,
		valid: Object.keys(errors).length < 1
	}
}

module.exports.validateUser = (email, next) => {
	const theErrors = {};
	userData.find({ email: email}).then(user=>{
	if (user){
		console.log("brooo")
		theErrors["email"] = "Email already in use"
		}	
	})
	return{
		theErrors,
		isValid: Object.keys(theErrors).length < 1
	}
}