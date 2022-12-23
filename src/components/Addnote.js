import React from 'react'
import { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const Addnote = () => {
    const context = useContext(noteContext)
    const {addNote}=context

    const [note, setNote] = useState({ title: "", description: "" ,tag:"default"})
    
    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
    }

    const onChange = (e) => {
        setNote({...note,[e.target.name]:e.target.value})
    }

    return (
        <div>
            <div className="container my-3">
                <h3>Add a note</h3>
                <form className="container my-3">
                    <div className="mb-3 row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-10">
                            <input type="title" className="form-control" id="title" name="title" onChange={onChange} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                            <input type="description" className="form-control" id="description" name="description"onChange={onChange} />
                        </div>
                    </div>
                    <button className='tn btn-primary' type="submit" onClick={handleClick}>Add note</button>
                </form>

            </div>
        </div>
    )
}

export default Addnote
