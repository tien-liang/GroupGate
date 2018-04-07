import React, { Component } from "react";
import axios from 'axios';
import Nav from '../components/Nav';
import UserCard from '../components/UserCard';
import {  Header, Dropdown } from "semantic-ui-react";
//import OtherUser from '../components/OtherUser';

const userId = '5ab60109351f8a12ba4937b2';    // you have to update this user ID with id from your backend

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
    this.getUserCourses = this.getUserCourses.bind(this);
    this.getUserName = this.getUserName.bind(this);
    this.getOtherUsers = this.getOtherUsers.bind(this);
    this.getGroups = this.getGroups.bind(this);
    this.eachUser = this.eachUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.getUserCourses();
    this.getOtherUsers();
    this.getUserName();
    this.getGroups();
  }
  getGroups(){
			axios.get(`http://localhost:3000/api/userinfos/${userId}/groupinfos`)
			.then(response => {
				this.setState( {
					groups: response.data,
					})
			})
  }
  getUserCourses(){
    var arr = [];
    axios.get(`http://localhost:3000/api/userinfos/${userId}/coursesTaken`)
    .then(response => {
      this.setState({courses: response.data})
    })
    axios.get(`http://localhost:3000/api/userinfos/${userId}/groupinfos`)
		.then(response => {
    response.data.map((group)=>{arr.push({ text: group.group_course, value: group.group_course });})
    this.setState({user_courses: arr})
		})
  }
  getOtherUsers(){
    axios.get(`http://localhost:3000/api/userinfos?filter[where][id][neq]=${userId}`)
    .then(response => {
      this.setState( {
        users: response.data,
      }, () => {
        console.log('OUP -> getOtherUsers: ',this.state.users);
      })
    })
  }
  getUserName(){
    axios.get(`http://localhost:3000/api/userinfos/${userId}`)
    .then(response => {
      this.setState( {
        name: response.data.display_name,
      }, () => {
        console.log('OUP -> getOtherUsers: ',this.state.users);
      })
    })
  }

  eachUser(user,i){
    var coursesTaken = [];
    axios.get(`http://localhost:3000/api//userinfos/${user.id}/coursesTaken`)
    .then(response => {
      response.data.map((course)=>{coursesTaken.push(course.course_number)});
      if (coursesTaken.includes(this.state.selected_course)){
        var courseId = this.state.courses.find((course)=>{return course.course_number === this.state.selected_course}).id;
        var group = this.state.groups.find((group)=>{return group.courseId === courseId});
        console.log(group)
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
