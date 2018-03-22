import React, { Component } from "react";
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { Button } from "semantic-ui-react";
import axios from 'axios';
=======
import EditableField from '../components/EditableField';
import EditableTextArea from '../components/EditableTextArea';
import Reference from '../components/Reference';
>>>>>>> a362a7013b47f2fd32e1d1d25c8ef54c3f14c320
import Nav from '../components/Nav';
import '../css/style.css';

<<<<<<< HEAD
import EditableField from '../components/EditableField';
import EditableTextArea from '../components/EditableTextArea';
import CourseList from '../components/CourseList';
//import UserInfoForm from '../components/forms/UserInfoForm'
=======
>>>>>>> a362a7013b47f2fd32e1d1d25c8ef54c3f14c320

export default class MyProfile extends Component {



  constructor(props) {
    super(props)
      this.state = {
        displayNameText: "John Doe",
        aboutMeText: "I am John Doe",
        courses: [],                                                             // have to bring the courses from CourseList
        references: [
          {
            id: 0,
            refProvider: "LinkedIn",
            refProfileUrl: "www.linkedin.com/johndoe"
          },
          {
            refProvider: "Git",
            refProfileUrl: "www.github.com/johndoe"
          }

        ],
        addCourseDisabled: false,
        addReferenceDisabled: false                                                           // have to bring the refs from ReferenceList
      }
      this.updateDisplayName = this.updateDisplayName.bind(this)
      this.updateAboutMe = this.updateAboutMe.bind(this)
      this.add = this.add.bind(this)
      this.eachReference = this.eachReference.bind(this)
      this.update = this.update.bind(this)
      this.remove = this.remove.bind(this)
      this.nextId = this.nextId.bind(this)
      this.onCancel = this.onCancel.bind(this)
  }

  updateDisplayName(newText) {
    this.setState( prevState => ({
      displayNameText: newText
    }) )
  }
  updateAboutMe(newText) {
    this.setState( prevState => ({
      aboutMeText: newText
    }) )
  }
  // ----------------------
  onCancel( newState ){
    this.setState({ addButtonDisabled: newState })
  }

<<<<<<< HEAD
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
=======
  update(newText1, newText2, i) {
    console.log('updating item at index', i, newText1, newText2)														// DEBUG

    this.setState(prevState => ({
      references: prevState.references.map(
        reference => (reference.id !== i) ? reference : {...reference, refProvider: newText1},
        reference => (reference.id !== i) ? reference : {...reference, refProfileUrl: newText2}
      )
    }));
    this.setState({ addButtonDisabled: false })
  }

  add(text1, text2) {

    this.setState(prevState => ({
      references: [
        ...prevState.references,
        {
          id: this.nextId(),
          refProvider: text1,
          refProfileUrl: text2
        }
      ],
    }))

    this.setState({ addButtonDisabled: true })
  }

  nextId() {
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
  }

  remove(id) {
    console.log('removing item at', id)																					// DEBUG
    this.setState(prevState => ({
      references: prevState.references.filter(reference => reference.id !== id)
    }))
  }

  eachReference(reference, i) {											// loop for the courses rendering
    return (
      <Reference key={reference.id} index={reference.id}
          label_1='Provider: ' value1={reference.provider}
          label_2='URL: ' value2={reference.profileUrl}

          onCancel={this.onCancel}
          onChange={this.update}
          onRemove={this.remove}>
          {reference.provider}{reference.profileUrl}
      </Reference>
    )
>>>>>>> a362a7013b47f2fd32e1d1d25c8ef54c3f14c320
  }

  render() {
    return (
<<<<<<< HEAD
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
=======

      <div className="container fluid">

        <Nav />
        {/* Body */}



          <div>
              {/* User Info */}
            <h5>Display Name</h5>
            <EditableField label=""
                            value = {this.state.displayNameText}
                            onChange = {this.updateDisplayName} />

            <h5>About Me</h5>
            <EditableTextArea label=""
                              value = {this.state.aboutMeText}
                              onChange = {this.updateAboutMe} />
          </div>

          <div className="">

            <h5>My Reference Profiles</h5>

            <button positive onClick={this.add}
                  id="add" disabled={this.state.addButtonDisabled}>
                + Add Profile Link
            </button>




>>>>>>> a362a7013b47f2fd32e1d1d25c8ef54c3f14c320
          </div>



      </div>
    );
  }
}

//   {this.state.references.map(this.eachReference)}
