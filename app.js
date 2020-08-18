'use strict'

var express = require('express')
var bodyParser = require('body-parser')


var app = express();

//archivos de rutas
var product_routes = require('./routes/product.route')



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
app.use('/api',product_routes)



module.exports = app