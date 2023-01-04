const express = require("express");
const { getProduct, createProduct, deleteProduct, updateProduct, bulkUpdateProduct, bulkDeleteProduct, fileUpload } = require("../../controllers/Product.controller");
const uploader = require("../../middleware/uploder");
const Product = require("../../models/Product.model");
// const multer=require('multer')
// const uploder=multer({dest:'images'})

const router = express.Router();
router.post("/file-upload", uploader.single("images"),fileUpload)
router.route("/").get(getProduct).post(createProduct);
router.route("/bulk-update").patch(bulkUpdateProduct)
router.route("/bulk-delete").delete(bulkDeleteProduct)
router.route("/:id").delete(deleteProduct).patch(updateProduct)
module.exports = router;
