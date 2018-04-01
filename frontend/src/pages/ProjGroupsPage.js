import React, { Component } from "react";
import Nav from '../components/Nav';
import GroupList from '../components/GroupList';

const userId = '5ab60109351f8a12ba4937b2';    // you have to update this user ID with id from your backend

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
          <GroupList userId={userId} myGroups={false}/>



      </div>
    );
  }
}
