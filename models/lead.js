const mongoose = require('mongoose')

var leadEmail= new mongoose.Schema({
	email: {
		type: String,
		required: 'Input your email bruv '
	},
})

module.exports = mongoose.model('LeadEmail', leadEmail)