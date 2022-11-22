const express = require("express");
const { getProduct, createProduct, deleteProduct, updateProduct, bulkUpdateProduct } = require("../controllers/Product.controller");
const Product = require("../models/Product.model");

const router = express.Router();

router.route("/").get(getProduct).post(createProduct);
router.route("/bulk-update").patch(bulkUpdateProduct)
router.route("/:id").delete(deleteProduct).patch(updateProduct)
module.exports = router;
