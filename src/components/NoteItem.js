import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
    const context = useContext(noteContext)
    //this note is coming from map(note)
    const { note } = props
    const { deleteNote } = context

    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description} </p>
                    <i className="fa fa-thin fa-trash mx-3" onClick={() => { deleteNote(note._id) }}></i>
                    <i className="fa fa-light fa-pen-to-square"></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
