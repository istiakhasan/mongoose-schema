const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please provide a name for this product "],
      trim: true,
      unique: true,
      minLength: [3, "Name must be at list 3 charachter"],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "price can't be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "unit value can't be {VALUES},must be kg/litre/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can't be negative"],
      validator: (values) => {
        const isInteger = Number.isInteger(values);
        if (isInteger) {
          return true;
        } else {
          return false;
        }
      },
      message: "Quantity must be an integer ",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontainued"],
        message: "Status can't be {VALUE}",
      },
    },
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

//Schema->Model->Query

// create model using mongoose

const Product = mongoose.model("Product", productSchema);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});
app.post("/api/v1/product", async (req, res, next) => {
  try {
    const product = new Product(req.body);
    if(product.quantity===0){
      product.status='out-of-stock'
    }
    const result = await product.save();
    // const result=await Product.create(req.body)
    res.status(200).json({
      status: "success",
      message: "Data inserted successfylly",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Data inserted failed",
      error:error.message
    });
  }


});

module.exports = app;
