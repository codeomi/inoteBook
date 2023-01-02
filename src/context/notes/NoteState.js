//This file stores all the props related to notes And then noteContext supplies this props to the components
import React from 'react'
import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const initialNotes = []
  const [notes, setNotes] = useState(initialNotes)

  //Add a note
  const addNote = async (id, title, description, tag) => {
    //TODO: api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5ODFmMzJkMThkYzA3NDkwNjU0ZjdkIn0sImlhdCI6MTY3MDkxMzg1OH0.V9QcEqU5aDaN2UW6E1B9JwMf1GPykpNAEPFMIONURWE'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json()
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
    //filter will crate a new array filled with elements which pass the test
    const newNotes = notes.filter((note) => { return note._id !== id })
    //newNotes is equale to notes which does not matches the id and thereby deleting the note
    setNotes(newNotes)
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5ODFmMzJkMThkYzA3NDkwNjU0ZjdkIn0sImlhdCI6MTY3MDkxMzg1OH0.V9QcEqU5aDaN2UW6E1B9JwMf1GPykpNAEPFMIONURWE'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    // setNotes(json)

    const newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        break
      }
    }
    setNotes(newNotes)
  }



  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState