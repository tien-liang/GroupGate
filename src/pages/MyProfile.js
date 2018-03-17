import React, { Component } from "react";
import EditableField from '../components/EditableField'
import EditableTextArea from '../components/EditableTextArea'

export default class MyProfile extends Component {
  constructor(props) {
    super(props)
      this.state = {
        displayNameText: "",
        aboutMeText: ""
      }
      this.updateDisplayName = this.updateDisplayName.bind(this)
      this.updateAboutMe = this.updateAboutMe.bind(this)
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
  render() {
    return (
      <div className="my-profile">
        <h5>Display Name</h5>
        <EditableField label=""
                        value = {this.state.displayNameText}
                        onChange = {this.updateDisplayName} />
        <h5>About Me</h5>
        <EditableTextArea label=""
                          value = {this.state.aboutMeText}
                          onChange = {this.updateAboutMe} />
        <h5>My Classes with Group projects </h5>
      </div>
    );
  }
}
