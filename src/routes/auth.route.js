'use strict'

const express = require('express')
const authController = require('../controllers/auth.controller')
const config = require('../configs/config')
const jwt = require('jsonwebtoken')

const router = express.Router()

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
router.post('/singin' , authController.singin )
router.post('/singup' , authController.singup )
router.get('/me' , ruta_protegida , authController.me )











module.exports = router