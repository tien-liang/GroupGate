import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '../components/forms/SignUpForm'
import '../css/login.css';

export default class SignUpPage extends Component {

render(){
  return(
    <div className="container-fluid">
      {/* Navbar */}
      <nav className="navbar">
        <img className="logo" src="http://via.placeholder.com/100x100" alt="Logo" width="50"/>
        <h1 className="mr-auto">Group Gate</h1>

        { /* TEMPORARY */ }
        <ul className="nav nav-tabs mr-auto">
          <p> Temp links until Sign in done--> </p>
          <li className="nav-item">
            <a className="nav-link" href="#">Other Users</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Project Groups</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/myProfile">My Profile</a>
          </li>
          </ul>

          <Link to="/">Sign In</Link>
      </nav><br/><br/>
      {/* Body */}
      <div>
        <h2 className="text-center notBold">Starting new class or personal group project? </h2>
        <h2 className="text-center notBold">Find the right people. Fast.</h2><br/>
        <h5 className="text-center notBold">Create Group. Find People. Finish Project. Provide Feedback.</h5><br/><br/>
        {/* Login Form */}
        <div className="d-flex justify-content-center">
            <SignUpForm />
        </div>
        <p className="text-center">Already have an account? <Link to="/">Sign In</Link></p>
      </div>
    </div>
  );
}

}
