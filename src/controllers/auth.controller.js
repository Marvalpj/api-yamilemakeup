'use strict'

const jwt = require('jsonwebtoken')
const config = require('../configs/config')
const User = require('../models/User')


var controller = {

    //registrar
    singup : async ( req , res , next) => {

        const { username , email , password} = req.body 
        const user = new User({
            username : username,
            email : email , 
            password : password
        })
        
        //guarda el usuario
        await user.save( ( err , userStored) => {

            if(err) return res.json({
                message : 'error' + err
            })

            // if(userStored) return res.json({
            //     message: 'user save',
            //     user : userStored
            // })

        } )

        const payload = {
            Id: user._id
        }
        const token = jwt.sign( payload , config.llave , {
        
            expiresIn: 1440
        
        } )

       res.json({
           auth: true , 
           token : token
       })


    } , 
    //logear
    singin : async (req , res , next) => {

        const {email , password } = req.body
        
        const user = await User.findOne({email : email})

        if( !user ){
            res.status(404).send('el email no existe')
        }

        const validPassword = await user.validatePassword(password)
        
        if( !validPassword ){
            res.status(401).json({
                auth:false,
                token:null
            })
        }
        const payload = {
            Id : user._id
        }
        
        const token = jwt.sign(payload , config.llave,{
            expiresIn : 1440
        })

        res.json({
            auth : true , 
            token : token
        })
    } ,
    
    me : async (req , res , next) => {
       
        //req.decoded --> contiene la informacion del user que realizo la peticion
        const user = await User.findById(req.decoded.Id , {password : 0})

        if(!user){
            return res.status(404).send('no user found')
        }

        res.json(user)
    } ,

}

module.exports = controller