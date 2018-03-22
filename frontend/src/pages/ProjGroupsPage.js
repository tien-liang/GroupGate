import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import axios from 'axios';
import ProjGroupItem from '../components/ProjGroupItem';


const BASE_URL = 'http://localhost:3000';
const url= `${BASE_URL}/api/projgroups`;

export default class ProjGroups extends Component {

  constructor() {
    super();
    this.state = {
      groups: []
    };
  }

  componentWillMount() {
    this.getProjGroups();
  }

  getProjGroups(){
    axios.get(url)
      .then(response => {
        this.setState( {groups: response.data}, () => {
          console.log(this.state)
        })
    })
  }


  render() {
    const projGroupItems = this.state.groups.map((group, i) => {
      return(
          <div className="panel-group ">
            <ProjGroupItem item={group} key={group.id}  />
          </div>
      )
    }
  )

    return (
      <div className="container fluid">
        <Nav />

        <h4> Groups You Created </h4>


        <p>DEV NOTE: Query for Current user not done yet</p>

        <h4> Groups Other Users Created </h4>


        <p>DEV NOTE: Currently All 'Project Groups' Displayed.</p>






          {projGroupItems}

      </div>
    );
  }
}
