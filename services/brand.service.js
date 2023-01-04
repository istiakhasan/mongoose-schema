const Brand = require("../models/Brand");

exports.createBrandService = async (data) => {
  const result = await Brand.create(data);

  return result;
};

exports.getBrandService = async () => {
  const brands = await Brand.find().select(" -suppliers").populate('products');
  return brands;
};
exports.getBrandByIdService = async (id) => {
  const brands = await Brand.findById(id).select("-products -suppliers");
  return brands;
};
exports.updateBrandService=async(id,data)=>{
   const result=await Brand.updateOne({_id:id},data,{runValidators:true})
   return result
}
