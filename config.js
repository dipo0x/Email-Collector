const mongoose = require('mongoose')

module.exports = ()=>{
    mongoose.connect('mongodb+srv://<db_name>:<db_password>@cluster0.98ez5.mongodb.net/LeadAPP?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
	if (!err){console.log('MongoDB connected')}
	else {console.log('Error : ' + err)}
    })}
