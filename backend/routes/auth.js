//AUTHENTICATION RELATED END-POINTS WILL GO HERE
const express = require("express")//importing express
const User = require('../models/User')//importing user
const router = express.Router()
const { body, validationResult } = require('express-validator')

//Create a User using: POST "/api/auth/". Doesnt require auth(authentication)

router.post('/', [
  //Over here we will add all the checks
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }).then(user => res.json(user))
    .catch(err => {console.log(err)
    res.json({error:"Please enter a valid email address",message:err.message})})

})

module.exports = router