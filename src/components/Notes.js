import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'
import Addnote from './Addnote'

const Notes = () => {
    const context = useContext(noteContext)
    const { notes, getNotes, addNote } = context
    useEffect(() => {
        return () => {
            getNotes()
            // eslint-disable-next-line
        }
    }, [])
    const ref = useRef(null)

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" })

    const handleClick = (e) => {
        console.log(note);
        e.preventDefault()
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Addnote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container my-3">
                                <h3>Add a note</h3>
                                <form className="container my-3">
                                    <div className="mb-3 row">
                                        <label htmlFor="title" className="row-sm-2 col-form-label">Title</label>
                                        <div className="col-sm-10">
                                            <input type="title" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="description" className="row-sm-2 col-form-label">Description</label>
                                        <div className="col-sm-10">
                                            <input type="description" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="tag" className="row-sm-2 col-form-label">Tag</label>
                                        <div className="col-sm-10">
                                            <input type="tag" value={note.etag} className="form-control" id="etag" name="etag" onChange={onChange} />
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row my-3'>
                <h3>Your note</h3>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes