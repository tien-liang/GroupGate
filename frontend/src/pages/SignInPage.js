import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from "../components/forms/LoginForm";

export default class SignInPage extends Component {

render(){
  return(
    <div className="container-fluid">

      {/* Header */}
      <nav className="navbar">
        <img className="logo" src="http://via.placeholder.com/100x100" alt="Logo" width="50"/>
        <h1 className="mr-auto">Group Gate</h1>

        <Link to="/signup">Sign Up</Link>
      </nav><br/><br/>

      {/* Body */}
      <div>
        <h2 className="text-center notBold">Starting new class or personal group project? </h2>
        <h2 className="text-center notBold">Find the right people. Fast.</h2><br/>
        <h5 className="text-center notBold">Create Group. Find People. Finish Project. Provide Feedback.</h5><br/><br/>
        {/* Login Form */}
        <div className="d-flex justify-content-center">
          <LoginForm />
        </div>
        <p className="text-center">Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
}

}

/*
// PREVIOUS VERSION, kept if any formating attribs need to be transfered

<form>
    <input type="email" className="form-control" id="loginEmail" placeholder="User ID (your email)"></input><br/>
    <input type="password" className="form-control" id="loginPassword" placeholder="Password"></input><br/>
  <div className="d-flex justify-content-center">
    <button type="submit" className="btn btn-primary">Submit</button>
  </div>
</form>



*/
