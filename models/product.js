'use strict'

var mongoose = require('mongoose')

var Schema = mongoose.Schema

var ProductSchema = Schema({
    title: String,
    code : String,
    descriptions:[String],
    image:String
})

module.exports = mongoose.model( 'Product' , ProductSchema)