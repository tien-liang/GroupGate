

import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from "react-router-dom";

//import LoginPage from './LoginPage'
//import SignUpPage from './SignUpPage'
import OtherUsers from './OtherUsers'
import ProjGroups from './ProjGroups'
import MyProfile from './MyProfile'

import '../css/App.css';

export default class App extends Component {
  render() {

        // Add NavLinks and Routes for Login and SignUp later
  return (
      <HashRouter>
      <div>
        <h1>Group Gate</h1>
        <ul className="header">

          <li><NavLink to="/otherUsers">Other Users</NavLink></li>
          <li><NavLink to="/projGroups">Project Groups</NavLink></li>
          <li><NavLink to="/myProfile">My Profile</NavLink></li>
        </ul>
        <div className="content">
            <Route path="/otherUsers"   component={ OtherUsers }/>
            <Route path="/projGroups"   component={ ProjGroups }/>
            <Route path="/myProfile"    component={ MyProfile }/>
        </div>

        <footer className="MainPanel-footer">
            <br/><p className="MainPanel-footer-text"> FOOTER goes here</p>
        </footer>

      </div>
      </HashRouter>


    );
  }
}
