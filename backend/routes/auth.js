//AUTHENTICATION RELATED END-POINTS WILL GO HERE
const express = require("express") //importing express
const User = require('../models/User') //importing user
const router = express.Router()
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

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
      return res.status(400).json({ error: "Sorry! The user with this email already exist" })
    }

    const salt = await bcrypt.genSalt( 10 ) //adding salt to the password
    const secPass = await bcrypt.hash( req.body.password, salt ) //created a secpass varable to store hashed password, which is then sent to database by create()func

    //create new userr
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })
    res.json(user)
  }

  catch (error) {
    console.error(error.message)
    res.status(500).send("Some error has occured")
  }

})

module.exports = router