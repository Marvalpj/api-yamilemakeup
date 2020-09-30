'use strict'

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password:String
})


UserSchema.methods.validatePassword = function( password){

    return (password == this.password)

}

module.exports = mongoose.model('User' , UserSchema)