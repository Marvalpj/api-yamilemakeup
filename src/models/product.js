'use strict'

const mongoose = require('mongoose')

var ProductSchema = new mongoose.Schema({
    title: String,
    code : String,
    descriptions:[String],
    image:String
})

module.exports = mongoose.model( 'products' , ProductSchema)