'use strict'

const express = require('express'),
    bodyParser = require('body-parser'),
    app = express()
    

//archivos de rutas
var product_routes = require('./routes/product.route')
var auth_routes = require('./routes/auth.route')

//middewares
    //lo que llegue por post conviertele a json
app.use(bodyParser.urlencoded({extended:false}))
    //todo lo que llegue conviertelo a json, cualquier tipo de peticion
app.use( bodyParser.json() )


//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})

//rutas
app.use('/api', product_routes)
app.use('/api', auth_routes)


module.exports = app