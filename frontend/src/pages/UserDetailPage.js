import React, { Component } from "react";
import Nav from '../components/Nav';
import { Button } from "semantic-ui-react";

export default class UserDetail extends Component {
  constructor() {
    super();
    this.state = {
          displayName: 'Snoopy22',
					totalScore: '85',
					numOfRatings: '2',
          aboutUser: 'I am good at C++ and Java. I am working well in team and also on my own. I like banana.',
          courses: [
            {
              id : '470',
              courseNumber : 'CMPT 470',
              termYear: 2018,
              termSemester: "Spring"
            },
            {
              id : '275',
              courseNumber : 'CMPT 275',
              termYear: 2017,
              termSemester: "Fall"
            }
          ],
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
          ]
    };
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
                </div>
              )
            })}
            <h5 className="ui dividing header">Reference Profiles</h5>
            {this.state.references.map((reference,i)=>{
              return (
                <div className="ui segment grid">
                  <div className="ui three wide column">{reference.refProvider}</div>
                  <div className="ui thirdteen wide column">{reference.refProfileUrl}</div>
                </div>
              )
            })}
          </div>
      </div>
    );
  }
}
