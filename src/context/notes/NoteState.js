//This file stores all the props related to notes And then noteContext supplies this props to the components
import React from 'react'
import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const initialNotes = []
  const [notes, setNotes] = useState(initialNotes)

  //Add a note
  const addNote = async (title, description, tag) => {
    //TODO: api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5ODFmMzJkMThkYzA3NDkwNjU0ZjdkIn0sImlhdCI6MTY3MDkxMzg1OH0.V9QcEqU5aDaN2UW6E1B9JwMf1GPykpNAEPFMIONURWE'
      },
      body: JSON.stringify({ title, description, tag })
    });

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

  
  //Get all notes
  const getNotes = async () => {
    //TODO: api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5ODFmMzJkMThkYzA3NDkwNjU0ZjdkIn0sImlhdCI6MTY3MDkxMzg1OH0.V9QcEqU5aDaN2UW6E1B9JwMf1GPykpNAEPFMIONURWE'
      },
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  //Delete a note
  const deleteNote = async (id) => {
    //TODO: api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5ODFmMzJkMThkYzA3NDkwNjU0ZjdkIn0sImlhdCI6MTY3MDkxMzg1OH0.V9QcEqU5aDaN2UW6E1B9JwMf1GPykpNAEPFMIONURWE'
      },
    });
    const json = await response.json()
    setNotes(json)
    console.log(json)
    console.log("delete note " + id)
    //filter will crate a new array filled with elements which pass the test
    const newNotes = notes.filter((note) => { return note._id !== id })
    //newNotes is equale to notes which does not matches the id and thereby deleting the note
    setNotes(newNotes)
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5ODFmMzJkMThkYzA3NDkwNjU0ZjdkIn0sImlhdCI6MTY3MDkxMzg1OH0.V9QcEqU5aDaN2UW6E1B9JwMf1GPykpNAEPFMIONURWE'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    setNotes(json)

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title
        element.description = description
        element.tag = tag
      }
    }
  }



  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState