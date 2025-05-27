const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        required:true,
        type:String,
        unique:true
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    }
})
module.exports = mongoose.model('User',userSchema)