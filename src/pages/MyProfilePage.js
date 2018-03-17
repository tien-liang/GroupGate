import React, { Component } from "react";
import { Link } from 'react-router-dom';
import EditableField from '../components/EditableField'
import EditableTextArea from '../components/EditableTextArea'

import UserInfoForm from '../components/forms/UserInfoForm'



export default class MyProfile extends Component {
  constructor(props) {
    super(props)
      this.state = {
        displayNameText: "",
        aboutMeText: ""
      }
      this.updateDisplayName = this.updateDisplayName.bind(this)
      this.updateAboutMe = this.updateAboutMe.bind(this)
  }
  updateDisplayName(newText) {
    this.setState( prevState => ({
      displayNameText: newText
    }) )
  }
  updateAboutMe(newText) {
    this.setState( prevState => ({
      aboutMeText: newText
    }) )
  }
  render() {
    return (

      <div className="container-fluid">
        {/* Navbar */}
        <nav className="navbar">
          <img className="logo" src="http://via.placeholder.com/100x100" alt="Logo" width="50"/>
          <h1 className="mr-auto">Group Gate</h1>

          <ul className="nav nav-tabs mr-auto">

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

            <Link to="/">Sign Out</Link>
        </nav><br/><br/>

        {/* Body */}

          <UserInfoForm />


      </div>
    );
  }
}

//         <UserInfoForm />
