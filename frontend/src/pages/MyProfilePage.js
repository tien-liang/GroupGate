import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from '../components/Nav';

//import EditableField from '../components/EditableField';
//import EditableTextArea from '../components/EditableTextArea';
//import CourseList from '../components/CourseList';
//import UserInfoForm from '../components/forms/UserInfoForm'

export default class MyProfile extends Component {
  constructor(props) {
    super(props)
      this.state = {
        displayNameText: "",
        aboutMeText: "",
        courses: [],                                                             // have to bring the courses from CourseList
        references: []                                                           // have to bring the refs from ReferenceList
      }
      //this.updateDisplayName = this.updateDisplayName.bind(this)
      //this.updateAboutMe = this.updateAboutMe.bind(this)
  }






  render() {
    return (



        <div>
          <div>

            <Nav />

            <h5>Display Name</h5>

            <h5>About Me</h5>





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
