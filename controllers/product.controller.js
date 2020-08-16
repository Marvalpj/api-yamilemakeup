'use strict'

var Product = require('../models/product')



var controller = {

    addProduct : function(req , res){

        var product = new Product()
        var params = req.body

        product.title = params.title
        product.code = params.code
        product.descriptions = params.descriptions
        product.image = params.image
    
        product.save( (err , productStored )=>{

            if(err) return res.status(500).send({message:'error al guardar el producto'})
            
            if(!productStored) return res.status(404).send({message:'no se ha podido guardar el producto'})
            
            if(productStored) return res.status(200).send({productStored})

        } )


    },

    getProduct: function( req , res) {

        var productID = req.params.id

        if( productID == null) return res.status(404).send({message:'el producto no existe'})

        Product.findById( productID , ( err , product ) =>{

            if(err) return res.status(500).send({message:'error al devolver los datos'})

            if(!project) return res.status(404).send({message:'el producto no existe'})

            return res.status(200).send({
                product : product
            })

        } )

    },

    getProducts : function( req , res){

        Product.find({}).exec( (err , products) =>{

            if(err) return res.status(500).send({message:'error al devolver datos'})

            if(!products) return res.status(404).send({message:'no hay productos para mostrar'})
            
            return res.status(200).send({products})

        })

    },

    updateProduct : function( req ,res){

        var productID = req.params.id
        //nueva data
        var update = req.body


        Product.findByIdAndUpdate( productID , update , {new: true} , ( err , productUpdate) =>{

            if(err) return res.status(500).send({message:'error al actualizar'})

            if(!productUpdate) return res.status(404).send({message:'no existe el producto a actualizar'})
 
            if(productUpdate) return res.status(200).send({product:productUpdate})

        })

    },

    deleteProduct : function( req , res ){

        var productID = req.params.id

        Product.findByIdAndDelete( productID  , ( err , productRemove) =>{

            if(err) return res.status(500).send({message:'no se ha podido borrar el producto'})

            if(!productRemove) return res.status(404).send({message:'el producto no existe'})
 
            return res.status(200).send({
                product:productRemove
            }) 

        })


    }



}

module.exports = controller