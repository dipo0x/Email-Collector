const mongoose = require('mongoose')

module.exports = ()=>{
    mongoose.connect('mongodb://localhost:27017/lead', { useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
	if (!err){console.log('MongoDB connected')}
	else {console.log('Error : ' + err)}
    })}
