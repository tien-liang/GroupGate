import React, { Component } from "react";
import Nav from '../components/Nav';
import GroupList from '../components/GroupList';
import auth from '../Auth'
const userId = auth.getUserInfo();

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
          <h5 className="ui dividing header">Project Groups You Are In</h5>
          <GroupList userId={userId} myGroups={true}/>

      </div>
    );
  }
}
