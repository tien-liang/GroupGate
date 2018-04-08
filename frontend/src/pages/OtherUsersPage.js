import React, { Component } from "react";
import axios from 'axios';
import Nav from '../components/Nav';
import UserCard from '../components/UserCard';
import {  Header, Dropdown } from "semantic-ui-react";

import auth from '../Auth'
const userId = auth.getUserInfo();

export default class OtherUsers extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      name: '',
      users: [],
      courses: [],
      groups: [],
      user_courses: [],
      selected_course: ""
    };
    this.eachUser = this.eachUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    this.getUserInfo();
  }

  getUserInfo(){
    axios.get(`http://localhost:3000/api/userinfos?filter={"where":{"userId":{"like":"${userId}"}}}`)
      .then(response => {
        this.setState( {
          id: response.data[0].id,
          name: response.data[0].display_name
          }, () => {
          console.log('MP -> Loading user: ', this.state);
        })
        axios.get(`http://localhost:3000/api/userinfos/${this.state.id}/groupinfos`)
  			.then(group_response => {
  				this.setState( {
  					groups: group_response.data,
  					})
            var arr = [];
            group_response.data.map((group)=>{arr.push({ text: group.group_course, value: group.group_course });})
            this.setState({user_courses: arr})
        		})
        axios.get(`http://localhost:3000/api/userinfos/${this.state.id}/coursesTaken`)
        .then(course_response => {
          this.setState({courses: course_response.data})
        })
        axios.get(`http://localhost:3000/api/userinfos?filter[where][id][neq]=${this.state.id}`)
        .then(other_response => {
          console.log(other_response)
          this.setState( {
            users: other_response.data,
          }, () => {
            console.log('OUP -> getOtherUsers: ',this.state.users);
          })
        })
      })
  }

  eachUser(user,i){
    var coursesTaken = [];
    axios.get(`http://localhost:3000/api/userinfos/${user.id}/coursesTaken`)
    .then(response => {
      response.data.map((course)=>{coursesTaken.push(course.course_number)});
      if (coursesTaken.includes(this.state.selected_course)){
        var courseId = this.state.courses.find((course)=>{return course.course_number === this.state.selected_course}).id;
        var group = this.state.groups.find((group)=>{return group.courseId === courseId});
        console.log(courseId)
        var groupId;
        if (group){
          groupId = group.id;
        }
        return(
          <UserCard user={user} inviter_id={userId} inviter_name={this.state.name} selected_course={this.state.selected_course} groupId={groupId}/>
        )}
    })
    }
    handleChange(e,value){
      this.setState({selected_course:value.value})
    }
    render() {
      return (

        <div className=" container fluid">
          <Nav />
          <br/>
          {/*render user cards*/}
          <Header as='h2'>
            Find Users
            <Header.Subheader>
              Select a course to find users in your course
              Make sure you have a group created to see specific course in the list
            </Header.Subheader>
          </Header>
          <Dropdown button className='icon' floating labeled icon='filter' search placeholder='Search Courses' options={this.state.user_courses} onChange={this.handleChange}/>
          <br/><br/>
          <div className="ui cards">
            {this.state.users.map((user,i)=>{return this.eachUser(user,i)})}
          </div>
        </div>
      );
    }
  }
