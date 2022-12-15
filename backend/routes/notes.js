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

//ROUTE 3:***update note***PUT###localhost:5000/api/notes/updatenote........LOGIN REQUIRED
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        // destructuring of note
        const { title, description, tag } = req.body
        //Create a newNote object, to store updation of a note
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        //Find the note to be updated and update it.
        let note = await Note.findById(req.params.id)//req.params.id=whatever id we give in the route
        if (!note) { res.status(404).message("Not found.") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed.")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Some error has occured")
    }
})


//ROUTE 4:***delete existing note***DELETE###localhost:5000/api/notes/deletenote........LOGIN REQUIRED
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        //Find the note to be deleted and delete it.
        let note = await Note.findById(req.params.id)//req.params.id=whatever id we give in the route
        if (!note) { res.status(404).send("Not found.") }

        //Check if the user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed.")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has be DELETED." })


    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Some error has occured")
    }


})

module.exports = router