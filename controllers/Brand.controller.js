const { createBrandService, getBrand, getBrandService, getBrandByIdService, updateBrandService } = require("../services/brand.service")

exports.createBrand=async(req,res,next)=>{
    try {
        const result= await createBrandService(req.body);
        res.status(200).json({
          status:"Success",
          message:"Successfully create the brand "
        })
    } catch (error) {
        res.status(400).json({
            status:"Failed",
            error:"Could not create the brand "
        })
    }
  
}
exports.getBrand =async(req,res,next)=>{
    try {
        const brands= await getBrandService();
        res.status(200).json({
          status:"Success",
          message:"Successfully get the brands ",
          data:brands
        })
    } catch (error) {
        res.status(400).json({
            status:"Failed",
            error:"Could not get the brands "
        })
    }

}
exports.getBrandById =async(req,res,next)=>{
    try {
        const brand= await getBrandByIdService(req.params.id);
        if(!brand){
          return res.status(400).json({
            status:"Failed",
            error:"Could not find a brand with this id "
          })
        }
        res.status(200).json({
          status:"Success",
          message:"Successfully get the brand ",
          data:brand
        })
    } catch (error) {
        res.status(400).json({
            status:"Failed",
            error:"Could not get the brand "
        })
    }

}
exports.updateBrand =async(req,res,next)=>{
    console.log(req?.params?.id,req.body)
    try {
        const result= await updateBrandService(req?.params?.id,req.body);
        if(!result.nModified){
          return res.status(400).json({
            status:"Failed",
            error:"Updated  failed "
          })
        }
        res.status(200).json({
          status:"Success",
          message:"Successfully updated the brand ",
          data:result
        })
    } catch (error) {
        res.status(400).json({
            status:"Failed",
            error:"MOdified count failed  "
        })
    }

}
