import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Button } from "semantic-ui-react";
import axios from 'axios';
import Nav from '../components/Nav';
import '../css/style.css';

import EditableField from '../components/EditableField';
import EditableTextArea from '../components/EditableTextArea';
import CourseList from '../components/CourseList';
//import UserInfoForm from '../components/forms/UserInfoForm'

export default class MyProfile extends Component {
  constructor(props) {
    super(props)
      this.state = {
        displayNameText: "John Doe",
        aboutMeText: "I am John Doe",
        courses: [],                                                             // have to bring the courses from CourseList
        references: []                                                           // have to bring the refs from ReferenceList
      }
      //this.updateDisplayName = this.updateDisplayName.bind(this)
      //this.updateAboutMe = this.updateAboutMe.bind(this)
  }

  updateDisplayName(newName){
    this.setState({displayNameText: newName});
  }
  updateAboutMe(newAboutMe){
    this.setState({aboutMeText: newAboutMe});
  }
  addCourse(course){
    var coursesArray = this.state.courses;
    coursesArray.push(course);
    this.setState({courses:coursesArray});
  }

  render() {
    return (
        <div>
          <div>

            <Nav />
            <br/>

              {/*Display Name Section*/}
              <h5 className="sectionTitle ui dividing header">Display Name</h5>
              <EditableField label=""
                              value = {this.state.displayNameText}
                              onChange = {this.updateDisplayName.bind(this)} />

              {/*About Me Section*/}
              <h5 className="sectionTitle ui dividing header">About Me</h5>
              <EditableTextArea label=""
                                value = {this.state.aboutMeText}
                                onChange = {this.updateAboutMe.bind(this)} />

              {/*My Class Section*/}
              <h5 className="sectionTitle ui dividing header">My Classes with Group Projects</h5>
              <CourseList/>

              {/*My Project Section*/}
              <h5 className="sectionTitle ui dividing header">My Reference Profiles</h5>
              <Button basic color="blue" onClick={this.addProject}>+ Add Project Link</Button>
          </div>
        </div>


    );
  }
}

/*

<h5>Display Name</h5>
<EditableField label=""
                value = {this.state.displayNameText}
                onChange = {this.updateDisplayName} />
<h5>About Me</h5>
<EditableTextArea label=""
                  value = {this.state.aboutMeText}
                  onChange = {this.updateAboutMe} />
<h5>My Classes with Group projects </h5>




*/
