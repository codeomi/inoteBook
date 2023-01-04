import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const history = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json()
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authToken)
            history("/home")
            props.showAlert("Logged in Successfully", "success")
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div className="mt-3">
            <h2>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className='font-weight-bold' htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="email" name='email' placeholder="Enter email" value={credentials.email} onChange={onChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" name='password' placeholder="Password" value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary my-2">Submit</button>
            </form>
        </div>
    )
}

export default Login