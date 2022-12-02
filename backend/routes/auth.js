//AUTHENTICATION RELATED END-POINTS WILL GO HERE
const express = require("express")//importing express

const User= require('../models/User')//importing user
const router = express.Router()

//Create a User using: POST "/api/auth/". Doesnt require auth(authentication)
router.post('/',(req,res)=>{
    console.log(req.body)
    const user= User(req.body)
    user.save()
    res.send(req.body)
})

module.exports=router