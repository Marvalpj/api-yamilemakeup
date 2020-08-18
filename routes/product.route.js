'use strict'

var express = require('express')
var ProductController = require('../controllers/product.controller')

var router = express.Router()

//middlewares
const multipart = require('connect-multiparty')
var multipartMiddleware = multipart({uploadDir: './uploads/products'})


//rutas
router.post('/save-product' , ProductController.addProduct)
router.get('/products', ProductController.getProducts)
router.get('/product/:id?', ProductController.getProduct)
router.put('/product/:id?' , ProductController.updateProduct)
router.delete('/product/:id?' , ProductController.deleteProduct)
router.post('/upload-image/:id?' , multipartMiddleware , ProductController.uploadImage)
router.get('/get-image/:image' , ProductController.getImage)

module.exports =  router