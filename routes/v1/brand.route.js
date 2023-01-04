const express=require('express')
const { createBrand, getBrand, getBrandById, updateBrand } = require('../../controllers/Brand.controller')
const route=express.Router()


route.route('/').get(getBrand).post(createBrand)
route.route('/:id').get(getBrandById).patch(updateBrand)

module.exports=route