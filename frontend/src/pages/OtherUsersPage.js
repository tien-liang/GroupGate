import React, { Component } from "react";
import Nav from '../components/Nav';
import { Button } from "semantic-ui-react";

export default class OtherUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: [
        {
          displayName: 'Snoopy22',
					totalScore: '85',
					numOfRatings: '2'
        },
        {
          displayName: 'ReactDude',
					totalScore: '77',
					numOfRatings: '2'
        }
      ]
    };
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
                    <td><button type="button" className="btn btn-link">{user.displayName}</button></td>
                    <td>{user.totalScore}</td>
                    <td>{user.numOfRatings}</td>
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
