import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const history = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password } = credentials

        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
        const json = await response.json()
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authToken)
            history("/login")
        }
        else {
            alert("Invalid Credentials")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputName">Name</label>
                    <input type="name" className="form-control" id="name" name="name" aria-describedby="name" onChange={onChange} placeholder="Enter name"  required/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="email" onChange={onChange} placeholder="Enter email" required />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' minLength={5} onChange={onChange} placeholder="Password" required />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' minLength={5} onChange={onChange} placeholder="Password" required />
                </div>
                <button className="btn btn-primary my-3">Submit</button>
            </form>
        </div>
    )
}
