'use strict'

var express = require('express')

var bodyParser = require('body-parser')

var app = express();


//archivos de rutas




//middewares
    //lo que llegue por post conviertele a json
app.use(bodyParser.urlencoded({extended : false }))
    //todo lo que llegue conviertelo a json, cualquier tipo de peticion
app.use( bodyParser.json() )


//cors


//rutas
app.get('/' , ( req , res)=> {
    res.status(200).send({
        message : 'hola mundo'
    })
})



module.exports = app