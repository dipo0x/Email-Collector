const userData = require('../models/user')
const errors = {};

module.exports.ValidateInput = function(email, password, errors){
		if(email.trim()=== ''){
			errors.email = "Email cannot be empty";
			}	
		filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!filter.test(email)){
			errors.email = "Not a valid email address";
			}
		if(password.trim() === ''){
			errors.password = "Password cannot be empty";	
			}
		return { errors }
}

// module.exports.ValidateInput = function(email, password){
// 	new Promise(function(resolve, reject){
// 		validateRegInput(email, password, errors);
// 		userData.find({ email: email}).then(user=>{
// 			if (user){
// 				errors.email = "Email already in use"
// 			}
// 		})
// 	})
// 	return { errors }
// }