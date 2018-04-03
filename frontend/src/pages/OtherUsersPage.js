import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import { Button } from "semantic-ui-react";
//import OtherUser from '../components/OtherUser';

  const userId = '5ab60109351f8a12ba4937b2';    // you have to update this user ID with id from your backend

export default class OtherUsers extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      users: []
    };
    this.getOtherUsers = this.getOtherUsers.bind(this);
  }
  componentDidMount() {
    this.getOtherUsers();
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

  ratingRender(user){
    if (user.num_of_votes>0){
      return (((user.total_r_skills+user.total_r_comm+user.total_r_psolving+user.total_r_timemngmt+user.total_r_activity)/5)/user.num_of_votes)
    }else{
      return ("No Rating")
    }
  }

  render() {
    return (

      <div className=" container fluid">
          <Nav />
          <br/>
          <div className="ui link cards">
            {this.state.users.map((user,i)=>{
              return(
                <div className="card" href={`/otherUsers/${user.id}`}>
                  <div className="content">
                    <div className="header"><Link to={`/otherUsers/${user.id}`} >{user.display_name}</Link></div>
                  </div>
                  <div className="content">
                    Total Score (%): {this.ratingRender(user)}
                  </div>
                  <div className="content">
                    {user.num_of_votes} Vote(s)
                  </div>
                  <div className="ui bottom attached button">
                    + Invite
                  </div>
                </div>
              )
            })}
          </div>
          {/*
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
                    <td><Link to={`/otherUsers/${user.id}`} >{user.display_name}</Link></td>
                    {this.ratingRender(user)}
                    <td>{user.num_of_votes}</td>
                    <td><Button basic color="blue">Invite</Button></td>
                  </tr>
                )
              })}
            </tbody>

          </table>*/}
      </div>
    );
  }
}
