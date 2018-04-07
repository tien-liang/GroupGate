import React, { Component } from "react";
import Nav from '../components/Nav';
import { Button } from "semantic-ui-react";
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class OtherUserDetails extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      displayName: '',
      aboutMe: '',
      courses: [],
      references: [],
      groupsOwned: [],
      groupsJoined: [],
      totalRskills: '',
      totalRcomm: '',
      totalRpsolving: '',
      totalRtimemngmt: '',
      totalRactivity: '',
      numOfVotes: ''
    };
    this.ratingRender = this.ratingRender.bind(this);
  }

/*
"display_name": "DUMPSTER D",
"about_me": "I LIke trash",
"courses": [],
"references": [],
"groups_owned": [],
"groups_joined": [],
"total_r_skills": 160,
"total_r_comm": 140,
"total_r_psolving": 180,
"total_r_timemngmt": 190,
"total_r_activity": 200,
"num_of_votes"

*/

  componentDidMount() {
    this.getUserDetails();
    this.getUserCourses();
    this.getUserReferences();
  }

  getUserDetails() {                                                            // currently making multiple calls to temp loopback API
    let userId = this.props.match.params.id;                                    // but in the Django, it should be a sngle call, /api/users/
    axios.get(`http://localhost:3000/api/userinfos/${userId}`)
      .then(response => {
        this.setState( {
          id: response.data.id,
          displayName: response.data.display_name,
          aboutMe: response.data.about_me,
          totalRskills: response.data.total_r_skills,
          totalRcomm: response.data.total_r_comm,
          totalRpsolving: response.data.total_r_psolving,
          totalRtimemngmt: response.data.total_r_timemngmt,
          totalRactivity: response.data.total_r_activity,
          numOfVotes: response.data.num_of_votes
          }, () => {
          console.log('OUD -> Loading user: ', this.state);                      // DEBUG
        })
      })
  }

  getUserCourses(){
    let userId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/courseinfos?filter={"where":{"user_id":{"like":"${userId}"}}}`)
      .then(response => {
        this.setState( {courses: response.data}, () => {
					console.log('CL -> Trying to get courses:', this.state.courses);
				})
      })
  }

  getUserReferences(){
    let userId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/referenceinfos?filter={"where":{"user_id":{"like":"${userId}"}}}`)
      .then(response => {
        this.setState( {references: response.data}, () => {
					console.log('RL -> Trying to get references:', this.state.references);
				})
      })
  }

  ratingRender(){
    if (this.state.numOfVotes>0){
      console.log('OUD-> ', this.state.totalRskills+this.state.totalRcomm )
      return (((this.state.totalRskills+this.state.totalRcomm+this.state.totalRpsolving+this.state.totalRtimemngmt+this.state.totalRactivity)/5)/this.state.numOfVotes)
    }else{
      return ("No Rating")
    }
  }
  providerIcon(provider){
    if (provider === "LinkedIn"){
      return (<i className="fa fa-linkedin fa-2x"></i>);
    } else if (provider === "Git"){
      return (<i className="fa fa-github fa-2x"></i>);
    } else if (provider === "StackOverflow"){
      return (<i className="fa fa-stack-overflow fa-2x"></i>);
    } else{
      return provider;
    }
  }
  render() {
    return (
      <div className=" container fluid">
          <Nav />
          <br/>
          <div className="ui segment">
            <h5>User: {this.state.displayName}
              ({this.ratingRender()} % / {this.state.numOfVotes} ratings )</h5>
            <br/>
            <h5 className="ui dividing header">About User</h5>
            {this.state.aboutMe}
            <br/>
            <h5 className="ui dividing header">Classes with Group Projects</h5>
            {this.state.courses.map((course,i)=>{
              return (
                <div className="ui segment grid">
                  <div className="ui three wide column">{course.course_number}</div>
                  <div className="ui three wide column">Term: {course.term_semester} {course.term_year}</div>
                  <div className="ui six wide column"> Status: {"Open for initation"}</div>
                  <div className="ui three wide column"><Button basic color="blue">+ Invite</Button></div>
                </div>
              )
            })}
            <h5 className="ui dividing header">Reference Profiles</h5>
            {this.state.references.map((reference,i)=>{
              return (
                <div className="ui segment grid">
                  <div className="ui two wide column">{this.providerIcon(reference.ref_provider)}</div>
                  <div className="ui thirdteen wide column"><Link to={``}>
                    {reference.ref_url}
                  </Link></div>
                </div>
              )
            })}
          </div>
      </div>
    );
  }
}
