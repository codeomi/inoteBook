//AUTHENTICATION RELATED END-POINTS WILL GO HERE
const express = require("express") //importing express
const User = require('../models/User') //importing user
const router = express.Router()
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require("../middleware/fetchuser")
const { json } = require("express")

const JWT_SECRET = "OmJWTsign7890"


//ROUTE 1:***END-POINT FOR CREATING A USER****Create a User using: POST "/api/auth/createuser". Doesnt require login it creates user....NO LOGIN REQUIRED
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

    const salt = await bcrypt.genSalt(10) //adding salt to the password
    const secPass = await bcrypt.hash(req.body.password, salt) //created a secpass varable to store hashed password, which is then sent to database by create()func

    //create new userr
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET)
    res.json({ authToken })
    // res.json(user)
  }

  catch (error) {
    console.error(error.message)
    res.status(500).send("Some error has occured")
  }

})

//ROUTE 2: ***END-POINT FOR AUTHENTCATING A USER*** POST ###localhost:5000/api/auth/login ......NO LOGIN REQUIRED

router.post('/login', [
  //Over here we will add all the checks
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank.').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  let success= false
  //destructuring email and password from the req.body
  const { email, password } = req.body
  try {
    //finding email in the database
    const user = await User.findOne({ email })
    //if not found then below error
    if (!user) {
      return res.status(400).json({ error: "Please try log in with correct credentials(e)" })
    }
    //comparing password wth the given and the stored one in database
    const passwordCompare = await bcrypt.compare(password, user.password)
    //if passwords does not match the below error.
    if (!passwordCompare)
      return res.status(400).json({success, error: "Please try login wth correct credntials(p)." })

      //genereating token for that taking id
    const payLoad = {
      user: {
        id: user.id
      }
    }
    
    const authToken = jwt.sign(payLoad, JWT_SECRET) //token generated
    success=true
    res.json({success, authToken })//response

  } catch (error) {
    console.error(error.message)
    res.status(400).send("Internal server error occured.")
  }
})

//ROUTE 3:***END-POINT FOR GETTING USER DETAIL***POST###localhost:5000/api/auth/getuser........LOGIN REQUIRED
router.post('/getuser', fetchuser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

 try {
  const userId=req.user.id
  const user= await User.findById(userId).select("-password")
  res.send(user)
} catch (error) {
  console.error(error.message)
  res.status(400).send("Internal server error occured.")
}
})
module.exports = router