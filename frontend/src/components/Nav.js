import React from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <img className="logo" src="http://via.placeholder.com/100x100" alt="Logo" width="50"/>
        <h1 className="mr-auto">Group Gate</h1>


        <ul className="nav nav-tabs mr-auto">
          <li className="nav-item">
            <Link to='/otherUsers' className="nav-link">Other Users</Link>
          </li>
          <li className="nav-item">
            <Link to='/projGroups' className="nav-link">Project Groups</Link>
          </li>
          <li className="nav-item">
          <Link to='myProfile' className="nav-link">My Profile</Link>
          </li>
          </ul>

          <Link to="/">Sign Out</Link>
      </nav>

    );
  }
}
