const mongoose=require('mongoose')
const validator=require('validator')
const {ObjectId}=mongoose.Schema.Types
const productSchema = mongoose.Schema(
    {
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
      // price: {
      //   type: Number,
      //   required: true,
      //   min: [0, "price can't be negative"],
      // },
      unit: {
        type: String,
        required: true,
        enum: {
          values: ["kg", "litre", "pcs","bag"],
          message: "unit value can't be {VALUES},must be kg/litre/pcs/bag",
        },
      },
      // imageURLs:[{
      //   type:String,
      //   required:true,
      //   validate:{
      //     validator:(value)=>{
      //             if(!Array.isArray(value)){
      //               return false;
      //             }
      //             let isValid=true
      //             value.forEach(url=>{
      //               if(!validator.isURL(url)){
      //                 isValid= false;
      //               }
      //             })
      //             return isValid
      //     },
      //     message:"Please provide a valid image url"
      //   }
      // }],
      imageURLs:{
        type:String,
        required:true
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
      }
      // quantity: {
      //   type: Number,
      //   required: true,
      //   min: [0, "Quantity can't be negative"],
      //   validator: (values) => {
      //     const isInteger = Number.isInteger(values);
      //     if (isInteger) {
      //       return true;
      //     } else {
      //       return false;
      //     }
      //   },
      //   message: "Quantity must be an integer ",
      // },
      // status: {
      //   type: String,
      //   required: true,
      //   enum: {
      //     values: ["in-stock", "out-of-stock", "discontainued"],
      //     message: "Status can't be {VALUE}",
      //   },
      // },
      // createDAT:{
      //   type: Date,
      //   default:Date.now
      // },
      // updateDAT:{
      //   type:Date,
      //   default:Date.now
      // }
  
      // supplier:{
      //   type:mongoose.Schema.Types.ObjectId,
      //   ref:"Spplier" //reference collection or model
      // },
      // categories:[{
      //   name:{
      //     type:String,
      //     required:true
      //   },
      //   _id:mongoose.Schema.Types.ObjectId
      // }]
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
  const Product = mongoose.model("Product", productSchema);


  module.exports=Product