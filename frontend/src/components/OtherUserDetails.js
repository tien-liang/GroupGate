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

  ratingRender(){
    if (this.state.numOfVotes>0){
      console.log('OUD-> ', this.state.totalRskills+this.state.totalRcomm )
      return (


        <p>{((this.state.totalRskills+this.state.totalRcomm+this.state.totalRpsolving+this.state.totalRtimemngmt+this.state.totalRactivity)/5)/this.state.numOfVotes}
      </p>

     )
    }else{
      return (<p>No Rating</p>)
    }
  }

  render() {
    return (
      <div className=" container fluid">
          <Nav />
          <br/>
          <div className="ui segment">
            <h5>User: {this.state.displayName}
              ( {((this.state.totalRskills+this.state.totalRcomm+this.state.totalRpsolving
                +this.state.totalRtimemngmt+this.state.totalRactivity)/5)/this.state.numOfVotes}
                % / {this.state.numOfVotes} ratings )</h5>
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
                  <div className="ui three wide column"><Button basic color="blue">Join</Button></div>
                </div>
              )
            })}
            <h5 className="ui dividing header">Reference Profiles</h5>
            {this.state.references.map((reference,i)=>{
              return (
                <div className="ui segment grid">
                  <div className="ui three wide column">{reference.ref_provider}</div>
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
