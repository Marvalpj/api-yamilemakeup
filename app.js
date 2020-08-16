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
// app.use('/api', (req , res)=>{
//   return res.status(200).send({
//     title : "Juego de Brochas Salam",
//     code : "BLACK - Musu Cosmetic -3305/052",
//     descriptions : [ 
//         "Salam es el saludo isl&aacute;mico y significa paz.", 
//         "Las brochas del maquillador son el primer contacto que tiene el cliente con el maquillaje. Son el primer encuentro. Y esto explica por qu&eacute; son tan importantes", 
//         "El set de brochas \"Salam\" cuenta con 25 piezas indispensables tanto pra quien apenas comienza a dar sus primeros pasos como para los m&aacute;s experimentados."
//     ],
//     image : "images/Salambrushset.png"
//   })
// })


module.exports = app