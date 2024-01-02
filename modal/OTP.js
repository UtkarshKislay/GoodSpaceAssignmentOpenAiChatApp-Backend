const mongoose=require('mongoose');

const OPTSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
    },
    otpValue:{
        type:String,
        required:true,
        trim:true,
    }
})