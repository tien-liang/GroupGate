import React, { Component } from "react";
import axios from 'axios';
import Nav from '../components/Nav';
import { Button } from "semantic-ui-react";

  const userId = '5ab60109351f8a12ba4937b2';    // you have to update this user ID with id from your backend

export default class OtherUsers extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      users: [
      ]
    };
  }
  componentDidMount() {
    this.getUserInfo();
    this.getOtherUser();
  }

  getUserInfo(){
    axios.get(`http://localhost:3000/api/userinfos/${userId}`)
      .then(response => {
        this.setState( {
          id: response.data.id,
          }, () => {
          console.log(this.state);
        })
      })
  }
  getOtherUser(){
    axios.get(`http://localhost:3000/api/userinfos?filter[where][id][neq]=${userId}`)
      .then(response => {
        this.setState( {
          users: response.data,
          }, () => {
          console.log(this.state.users);
        })
      })
  }
  ratingRender(user){
    if (user.num_of_votes>0){
      return (<td>{(user.total_r_skills+user.total_r_comm+user.total_r_psolving+user.total_r_timemngmt+user.total_r_activity)/5/user.num_of_votes}</td>)
    }else{
      return (<td>No Rating</td>)
    }
  }
  render() {
    return (
      <div className=" container fluid">
          <Nav />
          <br/>
          <table className="ui very basic table">
            <thead>
              <tr>
                <th>Display Name</th>
                <th className="three wide">Total Score (%)</th>
                <th className="three wide"># of Ratings</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user,i)=>{
                return(
                  <tr key={i}>
                    <td><button type="button" className="btn btn-link">{user.display_name}</button></td>
                    {this.ratingRender(user)}
                    <td>{user.num_of_votes}</td>
                    <td><Button basic color="blue">Invite</Button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
      </div>
    );
  }
}
