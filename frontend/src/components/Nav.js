import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from "../assets/logo.png";
import auth from '../Auth'
import { Redirect } from 'react-router'
import {Button} from "semantic-ui-react";

export default class Nav extends React.Component {
  constructor(props){
      super(props)
      this.state = {
        logout: false
      }
      this.signout = this.signout.bind(this)
  }

  signout(){
    auth.clearAppStorage();
    this.setState({logout: true})
  }
  render() {
    if (this.state.logout){
      return  <Redirect to='/login' />
    }
    return (
      <nav className="navbar">
        <img className="logo" src={logoImg} alt="Logo" width="50"/>
        <h1 className="mr-auto">Group Gate</h1>


        <ul className="nav nav-tabs mr-auto">
          <li className="nav-item">
            <Link to='/otherUsers' className="nav-link">Other Users</Link>
          </li>
          <li className="nav-item">
            <Link to='/projGroups' className="nav-link">Project Groups</Link>
          </li>
          <li className="nav-item">
          <Link to='/' className="nav-link">My Profile</Link>
          </li>
          <li className="nav-item">
          <Link to='/invitation' className="nav-link">Invitation</Link>
          </li>
          <li className="nav-item">
          <Link to='/rating' className="nav-link">Rating</Link>
          </li>
          </ul>

          <Button basic onClick={this.signout}><Link to="/">Sign Out</Link></Button>
      </nav>

    );
  }
}
