//AUTHENTICATION RELATED END-POINTS WILL GO HERE
const express = require("express")//importing express
const router = express.Router()

router.get('/',(req,res)=>{
    obj={
        a:'thios',
        number:34
    }
    res.json(obj)
})

module.exports=router