const mongoose=require('mongoose')
const validator=require('validator')
const {ObjectId}=mongoose.Schema.Types
const stockSchema = mongoose.Schema(
    {
      productId:{
          type:ObjectId,
          required:true,
          ref:'Product'
      },  
      name: {
        type: String,
        require: [true, "Please provide a name for this product "],
        trim: true,
        unique: true,
        lowercase:true,
        minLength: [3, "Name must be at list 3 charachter"],
        maxLength: [100, "Name is too large"],
      },
      description: {
        type: String,
        required: true,
      },
     
      unit: {
        type: String,
        required: true,
        enum: {
          values: ["kg", "litre", "pcs","bag"],
          message: "unit value can't be {VALUES},must be kg/litre/pcs/bag",
        },
      },
      imageURLs:[{
        type:String,
        required:true,
        validate:{
          validator:(value)=>{
                  if(!Array.isArray(value)){
                    return false;
                  }
                  let isValid=true
                  value.forEach(url=>{
                    if(!validator.isURL(url)){
                      isValid= false;
                    }
                  })
                  return isValid
          },
          message:"Please provide a valid image url"
        }
      }],
      price:{
        type:Number,
        required:true,
        min:[0,"Product price can't be negative"]
      },
      quantity:{
        type:Number,
        required:true,
        min:[0,"Product quantity can't be negative"]
      },
      category:{
        type:String,
        required:true
      },
      brand:{
        name:{
          type:String,
          required:true
        },
        id:{
          type:ObjectId,
          ref:"Brand",
          required:true
        }
      },
      status:{
        type:String,
        required:true,
        enum:{
            values:['in-stock',"out-of-stock","discontinue"],
            message:"Status can't be {VALUE} "
        }
      },
      store:{
        name:{
            type:String,
            trim:true,
            required:[true,"Please provide a brand name "],
            mixLength:100,
            enum:{
                values:["dhaka","chattogram","rajshahi","sylet","khulna","borishal","rongpur","mymensing"],
                message:"{VALUE} is not a valid name "
            },
            lowercase:true
        },
        id:{
            type:ObjectId,
            required:true,
            ref:'Store'
        }
      },
      suppliedBy:{
        name:{
            type:String,
            trim:true,
            required:[true,"Please provide a supplier  name "],
            mixLength:100,
            
        },
        id:{
            type:ObjectId,
            ref:"Supplier"
        }
      }
     
    },
    {
      timestamps: true,
    }
  );
  
  // ==============================================middleweare================================================================//
  
  // Mongoose middleware for saving data =pre/post
  productSchema.pre("save", function (next) {
    if (this.quantity === 0) {
      this.status = "out-of-stock";
    }
    next();
  });
  productSchema.post("save", function (doc, next) {
    console.log("After saving data ");
    next();
  });
  //============================================================================================================================//
  //==============================================inject custom method==========================================================//
  productSchema.methods.logger = function () {
    console.log(`Data save for ${this.name}`);
  };
  //============================================================================================================================//
  //Schema->Model->Query
  
  // create model using mongoose
  //================================================create model================================================================//
  const Stock = mongoose.model("Stock", stockSchema);


  module.exports=Stock