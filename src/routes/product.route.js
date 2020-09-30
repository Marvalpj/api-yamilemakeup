'use strict'

const express = require('express')
const ProductController = require('../controllers/product.controller')
const router = express.Router()

//middlewares
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart({uploadDir: './uploads/products'})

const  ruta_protegida = ((req, res, next) => {
    
    const token = req.headers['x-access-token']
 
    if(token) {
      
        jwt.verify(token, config.llave , (err, decoded) => {      
        
            if (err) {
                return res.json({ mensaje: 'Token inválida' })    
            } 
            else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 })



//rutas
router.post('/save-product', ruta_protegida ,ProductController.addProduct)
router.get('/products', ProductController.getProducts)
router.get('/product/:id?', ProductController.getProduct)
router.put('/product/:id?', ruta_protegida , ProductController.updateProduct)
router.delete('/product/:id?', ruta_protegida , ProductController.deleteProduct)
router.post('/upload-image/:id?' , [ ruta_protegida , multipartMiddleware] , ProductController.uploadImage)
router.get('/get-image/:image' , ProductController.getImage)

module.exports =  router