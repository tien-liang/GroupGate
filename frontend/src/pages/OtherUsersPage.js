import React, { Component } from "react";
import axios from 'axios';
import Nav from '../components/Nav';
import UserCard from '../components/UserCard';
import { Button, Modal, Header, Icon } from "semantic-ui-react";
//import OtherUser from '../components/OtherUser';

  const userId = '5ab60109351f8a12ba4937b2';    // you have to update this user ID with id from your backend

export default class OtherUsers extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      name: '',
      users: [],
    };
    this.getUserName = this.getUserName.bind(this);
    this.getOtherUsers = this.getOtherUsers.bind(this);
    this.eachUser = this.eachUser.bind(this);
  }
  componentDidMount() {
    this.getOtherUsers();
    this.getUserName();
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
    return(
      <UserCard user={user} inviter_id={userId} inviter_name={this.state.name}/>
    )
  }
  render() {
    return (

      <div className=" container fluid">
          <Nav />
          <br/>
          {/*render user cards*/}
          <div className="ui link cards">
            {this.state.users.map(this.eachUser)}
          </div>
      </div>
    );
  }
}
