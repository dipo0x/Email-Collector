const mongoose = require('mongoose')

const connectDB = async ()=>{
    try{
        await mongoose.connect('mongodb+srv://Ogeneral2006:Ogeneral2006@cluster0.98ez5.mongodb.net/BookAPI?retryWrites=true&w=majority', { useNewUrlParser: true }), ()=>{
        console.log("Database connected")
    }
}
catch(err){
    console.log(err)
}
}

module.exports = connectDB