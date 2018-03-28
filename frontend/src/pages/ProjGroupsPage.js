import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import GroupList from '../components/GroupList';
import axios from 'axios';
import ProjGroupItem from '../components/ProjGroupItem';

const userId = '5ab93f5262a8ef074012e04a';    // you have to update this user ID with id from your backend

const BASE_URL = 'http://localhost:3000';
const url= `${BASE_URL}/api/groupinfos`;

export default class ProjGroups extends Component {

  constructor() {
    super();
    this.state = {
      groups: [],
    };
  }

  render() {

    return (
      <div className="container fluid">
        <Nav />

        <br/>

          {/*Your Groups Section*/}
          <h5 className="ui dividing header">Project Groups You Created</h5>
          <GroupList userId={userId} myGroups={true}/>

          {/*Other Users Groups Section*/}
          <h5 className="ui dividing header">Project Groups Other Users Created</h5>


      </div>
    );
  }
}
