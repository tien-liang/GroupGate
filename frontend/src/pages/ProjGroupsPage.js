import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import ProjectGroup from '../components/AddProjGroup';
import axios from 'axios';
import ProjGroupItem from '../components/ProjGroupItem';


const BASE_URL = 'http://localhost:3000';
const url= `${BASE_URL}/api/group_infos`;

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

        <br/>

          {/*Your Groups Section*/}
          <h5 className="ui dividing header">Project Groups You Created</h5>
          <ProjectGroup/>
          {/*Other Users Groups Section*/}
          <h5 className="ui dividing header">Project Groups Other Users Created</h5>

          {projGroupItems}
      </div>
    );
  }
}
