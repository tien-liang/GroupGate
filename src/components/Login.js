import React, { Component } from 'react';

import '../css/login.css';

export default class Login extends Component {

render(){
  return(
    <div className="container-fluid">
      {/* Navbar */}
      <nav className="navbar">
        <img className="logo" src="http://via.placeholder.com/100x100" alt="Logo" width="50"/>
        <h1 className="mr-auto">App Name</h1>
        <ul className="nav nav-tabs mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">Other Users</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Project Groups</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">My Profile</a>
          </li>
          </ul>
          <button className="btn btn-link">Sign In</button>
      </nav><br/><br/>
      {/* Body */}
      <div>
        <h2 className="text-center notBold">Starting new class or personal group project? </h2>
        <h2 className="text-center notBold">Find the right people. Fast.</h2><br/>
        <h5 className="text-center notBold">Create Group. Find People. Finish Project. Provide Feedback.</h5><br/><br/>
        {/* Login Form */}
        <div className="d-flex justify-content-center">
          <form>
              <input type="email" className="form-control" id="loginEmail" placeholder="User ID (your email)"></input><br/>
              <input type="password" className="form-control" id="loginPassword" placeholder="Password"></input><br/>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
        <p className="text-center">Don't have an account? <button className="btn btn-link">Sign Up</button></p>
      </div>
    </div>
  );
}

}
