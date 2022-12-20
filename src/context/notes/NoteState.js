//This file stores all the props related to notes And then noteContext supplies this props to the components
import React from 'react'
import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
const initialNotes=[
    {
      "_id": "63996f6bbdfb917f4228cbd7",
      "user": "63981f32d18dc07490654f7d",
      "title": "my title",
      "description": "please wake up early",
      "tag": "alarm",
      "date": "2022-12-14T06:38:35.996Z",
      "__v": 0
    },
    {
      "_id": "63996f6cbdfb917f4228cbd9",
      "user": "63981f32d18dc07490654f7d",
      "title": "my title",
      "description": "please wake up early",
      "tag": "alarm",
      "date": "2022-12-14T06:38:36.948Z",
      "__v": 0
    },
    {
      "_id": "63996f6bbdfb917f4228cbd7",
      "user": "63981f32d18dc07490654f7d",
      "title": "my title",
      "description": "please wake up early",
      "tag": "alarm",
      "date": "2022-12-14T06:38:35.996Z",
      "__v": 0
    },
    {
      "_id": "63996f6cbdfb917f4228cbd9",
      "user": "63981f32d18dc07490654f7d",
      "title": "my title",
      "description": "please wake up early",
      "tag": "alarm",
      "date": "2022-12-14T06:38:36.948Z",
      "__v": 0
    },
    {
      "_id": "63996f6bbdfb917f4228cbd7",
      "user": "63981f32d18dc07490654f7d",
      "title": "my title",
      "description": "please wake up early",
      "tag": "alarm",
      "date": "2022-12-14T06:38:35.996Z",
      "__v": 0
    },
    {
      "_id": "63996f6cbdfb917f4228cbd9",
      "user": "63981f32d18dc07490654f7d",
      "title": "my title",
      "description": "please wake up early",
      "tag": "alarm",
      "date": "2022-12-14T06:38:36.948Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(initialNotes)
   
    
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState