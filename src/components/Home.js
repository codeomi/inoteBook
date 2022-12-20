import React from 'react'
import Notes from './Notes'


const Home = () => {

  return (
    <div>
      <div className="container my-3">
        <h3>Add a note</h3>
        <form className="container my-3">
          <div className="mb-3 row">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="inputEmail" />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="inputPassword" />
            </div>
          </div>
        </form>
       <Notes></Notes>
      </div>
    </div>
  )
}

export default Home
