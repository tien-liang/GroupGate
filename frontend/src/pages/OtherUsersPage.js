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
      selected_course: "",
      group_id: ""
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
        console.log(group_response)
        this.setState( {
          groups: group_response.data,
        })
        var arr = [];
        group_response.data.map((group,i)=>{
          arr.push({ text: group.group_course, value: group.group_course });
          /*axios.get(`http://localhost:3000/api/groupinfos/${group.id}/courseinfos`)
          .then(course_response => {
          var groups = this.state.groups;
          groups[i].courseId = course_response.data.id
          this.setState({groups: groups})
        })*/
      })
      this.setState({user_courses: arr})
      console.log(this.state.user_courses)
      axios.get(`http://localhost:3000/api/userinfos/${this.state.id}/coursesTaken`)
      .then(course_response => {
        this.setState({courses: course_response.data})
      })
    })
  })
}
eachUser(user,i){
  if (user.userId !== userId){
  return(
    <UserCard key={i} user={user} inviter_id={this.state.id} inviter_name={this.state.name} selected_course={this.state.selected_course} groupId={this.state.group_id}/>
  )
}
}
handleChange(e,value){
  this.setState({selected_course:value.value})
  this.state.groups.map((group)=>{
    if(group.group_course === value.value){
      axios.get(`http://localhost:3000/api/courseinfos/${group.courseId}/userinfos`)
      .then(users_response=>{
        console.log(users_response)
        this.setState({users: users_response.data, group_id: group.id})
      })
    }
  })
}
render() {

  return (

    <div className="container fluid">
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
