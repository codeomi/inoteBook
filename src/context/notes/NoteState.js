//This file stores all the props related to notes And then noteContext supplies this props to the components
import React from 'react'
import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
    const s1 = {
        "name": "Omkar",
        "class": "5b"
    }
   
    
    return (
        <NoteContext.Provider>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState