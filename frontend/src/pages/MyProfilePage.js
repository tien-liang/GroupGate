import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Button } from "semantic-ui-react";
import EditableField from '../components/EditableField';
import EditableTextArea from '../components/EditableTextArea';
import Reference from '../components/Reference';
import CourseList from '../components/CourseList'

import Nav from '../components/Nav';
import '../css/style.css';

export default class MyProfile extends Component {



  constructor(props) {
    super(props)
      this.state = {
        displayNameText: "John Doe",
        aboutMeText: "I am John Doe",
        courses: [
          {
            id : '470',
            courseNumber : '470',
            termYear: 2018,
            termSemester: "Spring"
          }
        ],                                                             // have to bring the courses from CourseList
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


  addCourse(course){
    var coursesArray = this.state.courses;
    coursesArray.push(course);
    this.setState({courses:coursesArray});
}
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
    console.log('removing item at', id)
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

  }

  render() {
    return (

        <div>
          <div className="container fluid">

            <Nav />
            <br/>

              {/*Display Name Section*/}
              <h5 className="ui dividing header">Display Name</h5>
              <EditableField label=""
                              value = {this.state.displayNameText}
                              onChange = {this.updateDisplayName.bind(this)} />

              {/*About Me Section*/}
              <h5 className="ui dividing header">About Me</h5>
              <EditableTextArea label=""
                                value = {this.state.aboutMeText}
                                onChange = {this.updateAboutMe.bind(this)} />

              {/*My Class Section*/}
              <h5 className="ui dividing header">My Classes with Group Projects</h5>
              <CourseList courseList={this.state.courses}/>

              {/*My Project Section*/}
              <h5 className="ui dividing header">My Reference Profiles</h5>
              <Button basic color="blue" onClick={this.addProject}>+ Add Project Link</Button>



          </div>



      </div>
    );
  }
}

//   {this.state.references.map(this.eachReference)}
