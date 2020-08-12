'use strict'
// importando mongo
var mongoose = require('mongoose')

var app = require('./app')
var port = 3700

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/yamileMakeUp')
    .then( () =>{
        console.log("conexion a la bd establecida con exito...")

        //creacion del servidor
        app.listen( port , () =>{
            console.log('servidor corriendo en la url: localhost:3700')
        })

    })
    .catch((err)=>{
        console.log(err)
    })