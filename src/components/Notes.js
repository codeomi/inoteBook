import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'
import Addnote from './Addnote'

const Notes = (props) => {
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context
    const history = useNavigate()
    useEffect(() => {
        return () => {
            if(localStorage.getItem('token')){
                getNotes()
            }
            else{
                history('/login')
            }
            // eslint-disable-next-line
        }
    }, [])
    const ref = useRef(null)
    const closeModal = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
         
    }


    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        closeModal.current.click()
        setTimeout(() => {
            props.showAlert("Updated Succesfully", "success")
        }, 300); 
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Addnote showAlert={props.showAlert} />
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
                                            <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="description" className="row-sm-2 col-form-label">Description</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} minLength={5} required />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="tag" className="row-sm-2 col-form-label">Tag</label>
                                        <div className="col-sm-10">
                                            <input type="tag" value={note.etag} className="form-control" id="etag" name="etag" onChange={onChange} minLength={5} required />
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeModal} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row my-4 mx-2'>
                <h3>Your note</h3>
                <div className="container">
                    {notes.length === 0 && 'No notes to display.'}
                </div>
                {notes?.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes