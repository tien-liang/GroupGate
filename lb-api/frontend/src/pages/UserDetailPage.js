import React, { Component } from "react";
import Nav from '../components/Nav';
import { Button } from "semantic-ui-react";
import {Link} from 'react-router-dom';
import auth from '../Auth'
const userId = auth.getUserInfo();

export default class UserDetail extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      displayName: "",
      aboutMe: ""
    };
  }
  componentWillMount() {
    this.getUserInfo();
  }

  getUserInfo(){
    console.log(userId)
    axios.get(`http://localhost:3000/api/userinfos?filter={"where":{"userId":{"like":"${userId}"}}}`)
      .then(response => {
        if (response.data[0]){
        this.setState( {
          id: response.data[0].id,
          displayName: response.data[0].display_name,
          aboutMe: response.data[0].about_me,
          }, () => {
          console.log('MP -> Loading user: ', this.state);
        })}
      })
  }
  render() {
    return (
      <div className=" container fluid">
          <Nav />
          <br/>
          <div className="ui segment">
            <h5>User: {this.state.displayName} ( {this.state.totalScore} % / {this.state.numOfRatings} ratings )</h5>
            <br/>
            <h5 className="ui dividing header">About User</h5>
            {this.state.aboutUser}
            <br/>
            <h5 className="ui dividing header">Classes with Group Projects</h5>
            {this.state.courses.map((course,i)=>{
              return (
                <div className="ui segment grid">
                  <div className="ui three wide column">{course.courseNumber}</div>
                  <div className="ui three wide column">Term: {course.termSemester} {course.termYear}</div>
                  <div className="ui six wide column"> Status: {"Open for initation"}</div>
                  <div className="ui three wide column"><Button basic color="blue">Invite</Button></div>

                </div>
              )
            })}
            <h5 className="ui dividing header">Reference Profiles</h5>
            {this.state.references.map((reference,i)=>{
              return (
                <div className="ui segment grid">
                  <div className="ui three wide column">{reference.refProvider}</div>
                  <div className="ui thirdteen wide column"><Link to={``}>
                    {reference.refProfileUrl}
                  </Link></div>
                </div>
              )
            })}
          </div>
      </div>
    );
  }
}
