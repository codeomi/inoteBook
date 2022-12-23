//This file stores all the props related to notes And then noteContext supplies this props to the components
import React from 'react'
import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
  const initialNotes = [
    {
      "_id": "63996f6bbdfb917f42283cbd7",
      "user": "63981f32d18dc07490654f7d",
      "title": "my title",
      "description": "please wake up early",
      "tag": "alarm",
      "date": "2022-12-14T06:38:35.996Z",
      "__v": 0
    },
    {
      "_id": "63996f6cbdfb9174f4228cbd9",
      "user": "63981f32d18dc07490654f7d",
      "title": "my title",
      "description": "please wake up early",
      "tag": "alarm",
      "date": "2022-12-14T06:38:36.948Z",
      "__v": 0
    },
    {
      "_id": "63996f6bbdfb917f42528cbd7",
      "user": "63981f32d18dc07490654f7d",
      "title": "my title",
      "description": "please wake up early",
      "tag": "alarm",
      "date": "2022-12-14T06:38:35.996Z",
      "__v": 0
    },
    {
      "_id": "63996f6cbd2fb9157f4228cbd9",
      "user": "63981f32d18dc07490654f7d",
      "title": "my title",
      "description": "please wake up early",
      "tag": "alarm",
      "date": "2022-12-14T06:38:36.948Z",
      "__v": 0
    },
    {
      "_id": "63996f6bbdfb9117f4228cbd7",
      "user": "63981f32d18dc07490654f7d",
      "title": "my title",
      "description": "please wake up early",
      "tag": "alarm",
      "date": "2022-12-14T06:38:35.996Z",
      "__v": 0
    },
    {
      "_id": "63996f6cbdfb5917f4228cbd9",
      "user": "63981f32d18dc07490654f7d",
      "title": "my title",
      "description": "please wake up early",
      "tag": "alarm",
      "date": "2022-12-14T06:38:36.948Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(initialNotes)

  //Add a note
  const addNote = (title, description, tag) => {
    //TODO: api call
    console.log("Adding a new note")
    const note = {
      "_id": "63996f6cbdfb5917f42282cbd9",
      "user": "63981f32d18dc07490654f7d",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-12-14T06:38:36.948Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }

  //Delete a note
  const deleteNote = (id) => {
    //TODO: api call
    console.log("delete note" + id)
    //filter will crate a new array filled with elements which pass the test
    const newNotes = notes.filter((note) => { return note._id !== id })
    //newNotes is equale to notes which does not matches the id and thereby deleting the note
    setNotes(newNotes)
  }

  //Edit a note
  const editNote = (id, title, description, tag) => { }



  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState