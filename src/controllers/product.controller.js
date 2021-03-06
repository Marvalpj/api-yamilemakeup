'use strict'

var Product = require('../models/product')

//fs(fileSystem)- API para interactuar con el sistema de archivos 
const fs = require('fs')

const path = require('path')


var controller = {

    addProduct : async function(req , res){

        var product = new Product()
        var params = req.body

        product.title = params.title
        product.code = params.code
        product.descriptions = params.descriptions
        product.image = params.image
    
        await product.save( (err , productStored )=>{

            if(err) return res.status(500).send({message:'error al guardar el producto'})
            
            if(!productStored) return res.status(404).send({message:'no se ha podido guardar el producto'})
            
            if(productStored) return res.status(200).send({productStored})

        } )


    },

    getProduct: async function( req , res) {

        var productID = req.params.id

        if( productID == null) return res.status(404).send({message:'el producto no existe'})

        await Product.findById( productID , ( err , product ) =>{

            if(err) return res.status(500).send({message:'error al devolver los datos'})

            if(!product) return res.status(404).send({message:'el producto no existe'})

            return res.status(200).send({
                product : product
            })

        } )

    },

    getProducts : async function( req , res){

        await Product.find({}).exec( (err , products) =>{

            if(err) return res.status(500).send({message:'error al devolver datos'})

            if(!products) return res.status(404).send({message:'no hay productos para mostrar'})

            return res.status(200).send({products : products})

        })

    },

    updateProduct : async function( req ,res){

        var productID = req.params.id
        //nueva data
        var update = req.body


        await Product.findByIdAndUpdate( productID , update , {new: true} , ( err , productUpdate) =>{

            if(err) return res.status(500).send({message:'error al actualizar'})

            if(!productUpdate) return res.status(404).send({message:'no existe el producto a actualizar'})
 
            if(productUpdate) return res.status(200).send({product:productUpdate})

        })

    },

    deleteProduct : async function( req , res ){

        var productID = req.params.id

        await Product.findByIdAndDelete( productID  , ( err , productRemove) =>{

            if(err) return res.status(500).send({message:'no se ha podido borrar el producto'})

            if(!productRemove) return res.status(404).send({message:'el producto no existe'})
 
            return res.status(200).send({
                product:productRemove
            }) 

        })


    },

    uploadImage : async function( req , res){

        var productID = req.params.id
        var fileName

        if( req.files){
            //ruta de la imagen subida
            var filePath = req.files.image.path
            var fileSplit = filePath.split('\\')

            //nombre de la imagen
            fileName = fileSplit[2]
           
            var extSplit =fileName.split('.')
            var fileExt = extSplit[1].toLowerCase()
            
            
            if( fileExt == 'png' || fileExt == 'jpg' ){
                
                await Product.findByIdAndUpdate( productID , {image : fileName} , {new : true} , (err , productUpdate)=>{

                    if(err){

                        fs.unlink(filePath , (err)=>{
                            return res.status(500).send({message:'la imagen no pudo ser subida'})
                        })

                    } 

                    if(!productUpdate){
                        fs.unlink(filePath , (err)=>{
                            return res.status(404).send({message:'problemas al subir la imagem'})
                        })
                    }
                    
                    if(productUpdate) return res.status(200).send({
                        product : productUpdate
                    })

                })

            }else{
                fs.unlink(filePath , (err)=>{
                    return res.status(200).send({
                        message: 'la extension no es valida'
                    })
                })
            }

        }else{
            return res.status(200).send({
                message : 'no ha subido una imagen'
            })
        }
    },

    getImage : async function( req, res ){
        
        //name of file
        var file = req.params.image
        //route of file
        var path_file = './uploads/products/'+file

        await fs.exists( path_file , (exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_file))
            }else{
                return res.status(200).send({
                    message:'la imagen no existe'
                })
            }
        })

    }

}

module.exports = controller