import React, { useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";


const Navbar = () => {

    let location = useLocation();
    useEffect(() => {
    }, [location]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathway==="/home"?"active":""}`} aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathway==="/about"?"active":""}`}  to="/about">About</Link>
                            </li>

                        </ul>
                        <form className="d-flex" role="search">
                            <Link className="btn btn-primary mx-2" to="/login" type="submit">Login</Link>
                            <Link className="btn btn-primary mx-2" to="/signup" type="submit">Signup</Link>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
