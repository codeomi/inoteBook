const express = require("express")//importing express
const router = express.Router()
const fetchuser = require("../middleware/fetchuser")
const Note = require("../models/Note")
const { body, validationResult } = require('express-validator')

//ROUTE 1:***getting all notes***GET###localhost:5000/api/auth/fetchallnotes........LOGIN REQUIRED
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Some error has occured")
    }
})


//ROUTE 2:***adding new notes***POST###localhost:5000/api/notes/addnote........LOGIN REQUIRED
router.post('/addnote', fetchuser, [
    //Over here we will add all the checks
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Descripton must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        //destructuring of notes
        const { title, description, tag } = req.body
        //f there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //creating a new Note based on Note.js module
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Some error has occured")
    }

})

module.exports = router