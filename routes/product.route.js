'use strict'

var express = require('express')
var ProductController = require('../controllers/product.controller')

var router = express.Router()

//middleware
const multipart = require('connect-multiparty')
const product = require('../models/product')
// var multipartMiddleware = multipart.apply({uploadDir: './uploads'})


//rutas
router.post('/save-product' , ProductController.addProduct)
router.get('/products', ProductController.getProducts)
router.get('/product/:id?', ProductController.getProduct)
router.put('/product/:id?' , ProductController.updateProduct)
router.delete('/product/:id?' , ProductController.deleteProduct)


module.exports =  router