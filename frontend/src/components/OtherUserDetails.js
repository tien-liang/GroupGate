import React, { Component } from "react";
import Nav from '../components/Nav';
import { Button } from "semantic-ui-react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import auth from '../Auth'
const userId = auth.getUserInfo();

export default class OtherUserDetails extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      displayName: '',
      aboutMe: '',
      courses: [],
      references: []
    };
    this.ratingRender = this.ratingRender.bind(this);
  }


  componentWillMount() {
    this.getUserDetails();
    this.getUserCourses();
    this.getUserReferences();
    this.getRatings();
  }

  getRatings(){
    var tSkill = 0;
    var comm = 0;
    var psolve = 0;
    var time = 0;
    var act = 0;
    var count = 0;
    axios.get(`http://localhost:3000/api/userinfos/${this.props.match.params.id}/ratings`)
		.then(response =>{
			console.log(response.data)
      response.data.map((rating)=>{
        if (rating.rating_for_id === this.state.id && rating.rated){
          count++;
          tSkill+=rating.tech_skill;
          comm+=rating.communication;
          psolve+=rating.p_solving;
          time+=rating.timemngmt;
          act+=rating.activity;
        }
      })
			this.setState({
        tSkill: tSkill,
        comm: comm,
        psolve: psolve,
        time: time,
        act: act,
        count: count
      })
		})
  }
  getUserDetails() {                                                            // currently making multiple calls to temp loopback API
    this.setState({id: this.props.match.params.id});                                    // but in the Django, it should be a sngle call, /api/users/
    axios.get(`http://localhost:3000/api/userinfos/${this.props.match.params.id}`)
      .then(response => {
        this.setState( {
          id: response.data.id,
          displayName: response.data.display_name,
          aboutMe: response.data.about_me
          }, () => {
          console.log('OUD -> Loading user: ', this.state);                      // DEBUG
        })
        console.log(this.state.id)
      })
  }

  getUserCourses(){
    let userId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/userinfos/${userId}/coursesTaken`)
    .then(response =>{
      console.log(response.data)
      this.setState({courses: response.data})
    })
  }

  getUserReferences(){
    let userId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/userinfos/${userId}/referenceinfos`)
    .then(response =>{
      console.log(response.data)
      this.setState({references: response.data})
    }
    )
  }
  defaultURL(provider){
    if(provider === "StackOverflow"){
      return "http://stackoverflow.com/users/"
    }else if(provider === "Git"){
      return "http://github.com/"
    }else{
      return "http://www.linkedin.com/in/"
    }
  }
  ratingRender(user){
    //if more than 0, print the average rating
    if (this.state.count>0){
      return (((this.state.tSkill+this.state.comm+this.state.psolve+this.state.time+this.state.act)*4)/this.state.count)
      //if 0 rating, print No Rating
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
                &nbsp;({this.ratingRender()} % / {this.state.count} ratings )</h5>
            <br/>
            <h5 className="ui dividing header">About User</h5>
            {this.state.aboutMe}
            <br/>
            <h5 className="ui dividing header">Classes with Group Projects</h5>
            {this.state.courses.map((course,i)=>{
              return (
                <div className="ui segment grid">
                  <div className="ui three wide column">{course.course_number}</div>
                  <div className="ui nine wide column">Term: {course.term_semester} {course.term_year}</div>
                  <div className="ui three wide column"><Button basic color="blue">+ Invite</Button></div>
                </div>
              )
            })}
            <h5 className="ui dividing header">Reference Profiles</h5>
            {this.state.references.map((reference,i)=>{
              return (
                <div className="ui segment grid">
                  <div className="ui three wide column">{this.providerIcon(reference.ref_provider)}</div>
                  <div className="ui thirdteen wide column"><a>{this.defaultURL(this.props.provider)}{reference.ref_url}</a></div>
                </div>
              )
            })}
          </div>
      </div>
    );
  }
}
