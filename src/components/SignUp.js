import React, { Component } from 'react';

import '../css/login.css';

export default class SignUp extends Component {

render(){
  return(
    <div className="container-fluid">
      {/* Navbar */}
      <div className="navbar">
        <img src="http://via.placeholder.com/100x100" alt="Logo" width="50"/>
        <h1>App Name</h1>
        <button className="btn btn-link">Sign In</button>
      </div><br/><br/>
      {/* Body */}
      <div>
        <h2 className="text-center notBold">Starting new class or personal group project? </h2>
        <h2 className="text-center notBold">Find the right people. Fast.</h2><br/>
        <h5 className="text-center notBold">Create Group. Find People. Finish Project. Provide Feedback.</h5><br/><br/>
        {/* Login Form */}
        <div className="d-flex justify-content-center">
          <form>
              <input type="email" className="form-control" id="signupEmail" placeholder="SFU Email"></input><br/>
              <input type="text" className="form-control" id="signupName" placeholder="Display Name"></input><br/>
              <input type="password" className="form-control" id="signupPassword" placeholder="Create Password"></input><br/>
              <input type="password" className="form-control" id="signupVerifyPassword" placeholder="Retype Password"></input><br/>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">Create Profile</button>
            </div>
          </form>
        </div>
        <p className="text-center">Already have an account? <button className="btn btn-link">Log In</button></p>
      </div>
    </div>
  );
}

}
