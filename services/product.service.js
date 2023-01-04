const Brand = require("../models/Brand");
const Product = require("../models/Product.model");

module.exports.getProductService = async () => {
  const product = await Product.find({});
  return product;
};

module.exports.createProductSerice = async (data) => {
  const product = new Product(data);
  console.log(product,"product log")
  const {_id:productsId,brand}=product
  const res=await Brand.updateOne({_id:brand.id},{$push:{products:productsId}})
  console.log(res,"add product with brand")
  const result = await product.save();
  return result;
};

module.exports.updateProductService = async (id, data) => {
  const product = Product.findById(id);
  const result = await product.set(req.body).save();
  return result;
};
module.exports.bulkUpdateProductService = async (data) => {
  // const product=await Product.updateMany({_id:data.ids},data.data,{runValidators:true})
  // return product

  const products = [];
  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });

  const result = await Promise.all(products);
  return result;
};
module.exports.bulkDeleteProductService = async (ids) => {
  const result = await Product.deleteMany({ _id: ids });
  return result;
};
