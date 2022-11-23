// const Product = require("../models/Product.model");
const Product = require("../models/Product.model");
const mongoose=require('mongoose')
const {
  getProductService,
  createProductSerice,
  updateProductService,
  bulkUpdateProductService,
  bulkDeleteProductService,
} = require("../services/product.service");

module.exports.getProduct = async (req, res, next) => {
  try {
    // const products=await Product.find({},'name quantity')//projection (name r quantity chara r kico show korbe na )
    //  const products=await Product.find({}).select({name:1})//projection (select only one property  )
    //  const products=await Product.find({},'-name -quantity')//projection (name r quantity chara baki sob show korbe )
    // const products=await Product.find({_id:"637afe70141eb15180c912f6"})//here we can use any query like as mongodb
    // const products = await Product.where("name")
    //   .equals("Hashem")
    //   .where("quantity")
    //   .gt(5).lt(600).limit(2).sort({quantity:-1});
    //   const products=await Product.findById("637afe70141eb15180c912f6")
    // const products = await Product.findOne({ name: "Test2" });
    const products = await getProductService();
    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Can't get the data ",
      error: error.message,
    });
  }
};

module.exports.createProduct = async (req, res, next) => {
  try {
    // const product = new Product(req.body);
    // // if(product.quantity===0){
    // //   product.status='out-of-stock'
    // // }
    // const result = await product.save();
    // const result=await Product.create(req.body)
    const result = await createProductSerice(req.body);
    res.status(200).json({
      status: "success",
      message: "Data inserted successfylly",
      data: result,
    });
    result.logger();
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Data inserted failed",
      error: error.message,
    });
  }
};



module.exports.deleteProduct=async (req,res)=>{
    try {
      const id=req.params.id 
      const result=await Product.deleteOne({_id:id})
      res.status(200).json({
          success:true,
          message:"Item deleted successfully ",
          data:result
      })
    } catch (error) {
      res.status(400).json({
          success:false,
          message:"Failed",
          data:error.message
      })
    }
  }
module.exports.updateProduct=async (req,res)=>{
    try {
      const id=req.params.id 
      // const result=await Product.updateOne({_id:id},{$set:req.body},{runValidators:true})
      const product=await Product.findById(id)
     const result=await product.set(req.body).save()
    // const result=await updateProductService(id,req.body)
      res.status(200).json({
          success:true,
          message:"Item updated successfully ",
          data:result
      })
    } catch (error) {
      res.status(400).json({
          success:false,
          message:"Failed",
          data:error.message
      })
    }
  }
module.exports.bulkUpdateProduct=async (req,res)=>{
    try {
      const result=await bulkUpdateProductService(req.body)
      res.status(200).json({
          success:true,
          message:"All Items updated successfully by id",
          data:result
      })
    } catch (error) {
      res.status(400).json({
          success:false,
          message:"Failed",
          data:error.message
      })
    }
  }
module.exports.bulkDeleteProduct=async (req,res)=>{
    try {
      console.log(req.body.ids)
      const result=await bulkDeleteProductService(req.body.ids)
      if(!result.deletedCount){
        return res.status(400).json({
          status:"falid",
          error:"Couldn't delete the product , delete id not found "
        })
      }

      res.status(200).json({
          success:true,
          message:"Items deleted successfully",
          data:result
      })
    } catch (error) {
      res.status(400).json({
          success:false,
          message:"Failed",
          data:error.message
      })
    }
  }