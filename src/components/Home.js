import React from 'react'

const Home = () => {
  return (
    <div>
      <div className="container my-3">
        <h3>Add a note</h3>
        <form className="container my-3">
          <div className="mb-3 row">
            <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="inputPassword" />
            </div>
          </div>
          <div className="mb-3 row">
            <label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="inputPassword" />
            </div>
          </div>
        </form>
        <h3>Your note</h3>
      </div>

    </div>
  )
}

export default Home
