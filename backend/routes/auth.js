//AUTHENTICATION RELATED END-POINTS WILL GO HERE
const express = require("express")//importing express
const User = require('../models/User')//importing user
const router = express.Router()
const { body, validationResult } = require('express-validator')

//Create a User using: POST "/api/auth/createuser". Doesnt require login it creates user

router.post('/createuser', [
  //Over here we will add all the checks
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
  //f there are errors, return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    //check wether the user with this email exist already
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ error: "The user with this email already exist" })
    }
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    res.json(user)
  } 

  catch (error) {
   console.error(error.message) 
   res.status(500).send("Some error has occured")
  }

})

module.exports = router