const mongoose=require('mongoose')
const validator=require('validator')
const {ObjectId}=mongoose.Schema.Types 
const supplierSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide a name "],
        trim:true,
        lowercase:true,
        minLength:[3,"Name must be at least 3 charachters."],
        maxLength:[100,"Name is to large "]
    },
    email:{
        type:String,
        validate:[validator.isEmail,"Provide a valid email"],
        trim:true,
        lowercase:true,
        unique:true
    },
    brand:{
        name:{
            type:String,
            trim:true,
            required:true
        },
        id:{
            type:ObjectId,
            required:true,
            ref:"Brand"
        }
    }
})