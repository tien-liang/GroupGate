import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import ProjectGroup from '../components/AddProjGroup';
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

<<<<<<< HEAD
        <br/>

          {/*Your Groups Section*/}
          <h5 className="sectionTitle ui dividing header">Project Groups You Created</h5>
          <ProjectGroup/>
          {/*Other Users Groups Section*/}
          <h5 className="sectionTitle ui dividing header">Project Groups Other Users Created</h5>
=======
        <h4> Groups You Created </h4>


        <p>DEV NOTE: Query for Current user not done yet</p>

        <h4> Groups Other Users Created </h4>


        <p>DEV NOTE: Currently All 'Project Groups' Displayed.</p>



>>>>>>> a362a7013b47f2fd32e1d1d25c8ef54c3f14c320



          {projGroupItems}

      </div>
    );
  }
}
