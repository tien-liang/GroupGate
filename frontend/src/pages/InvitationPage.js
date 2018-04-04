import React, { Component } from "react";
import axios from 'axios';
import Nav from '../components/Nav';
import { Button, Form, Select, Grid, TextArea } from "semantic-ui-react";

const BASE_URL = 'http://localhost:3000';
const url= `${BASE_URL}/api/invitations`;
const userId = '5ab60109351f8a12ba4937b2';
export default class Invitation extends Component {
  constructor() {
    super();
    this.state = {
      invitation_received: [],
      invitation_sent: []
    };
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);
    this.cancel = this.cancel.bind(this);
    this.eachInvitationReceived = this.eachInvitationReceived.bind(this);
    this.eachInvitationSent = this.eachInvitationSent.bind(this);
  }

  componentDidMount(){
		this.getInvitations();
	}

  getInvitations(){
		axios.get(`${url}?filter={"where":{"inviter_id":{"like":"${userId}"}}} `)
		.then(response => {
				this.setState( {invitation_sent: response.data}, () => {
				})
		})
    axios.get(`${url}?filter={"where":{"invitee_id":{"like":"${userId}"}}} `)
		.then(response => {
				this.setState( {invitation_received: response.data}, () => {
				})
		})
	}
  accept(id){
    axios.request({
      method:'patch',
      url:`http://localhost:3000/api/invitations/${id}`,
      data: {status: "Accepted"}
    }).then(response => {
    }).catch(err => console.log(err));
  }
  reject(id){
    axios.request({
      method:'patch',
      url:`http://localhost:3000/api/invitations/${id}`,
      data: {status: "Rejected"}
    }).then(response => {
    }).catch(err => console.log(err));
  }
  cancel(id){
    axios.delete(`http://localhost:3000/api/invitations/${id}`)
      .then(response => {
        this.setState( {
          }, () => {
        })
      })

		this.setState(prevState => ({
			invitation_sent: prevState.invitation_sent.filter(invitation => invitation.id !== id)
		}))
  }
  eachInvitationReceived(invitation,i){
    return(
      <table className="ui single line basic table">
        <thead>
          <tr>
            <th className="three wide">{"Inviter"}</th>
            <th>{"Invitee"}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{invitation.inviter_id}</td>
            <td>{invitation.invitee_id}</td>
          </tr>
          <tr>
            <td colSpan="2">
      <span>
        <button  className="ui red button right floated" onClick={()=>this.reject(invitation.id)} id="reject">Reject</button>
        <button className="ui green button right floated" onClick={()=>this.accept(invitation.id)} id="accept">Accept</button>
      </span>
    </td>
    </tr>
    </tbody>
      </table>
    )
  }
  eachInvitationSent(invitation,i){
    return(
      <table className="ui single line basic table">
        <thead>
          <tr>
            <th className="three wide">{"Inviter"}</th>
            <th>{"Invitee"}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{invitation.inviter_id}</td>
            <td>{invitation.invitee_id}</td>
          </tr>
          <tr>
            <td colSpan="2">
      <span>
        <button className="ui red button right floated" onClick={()=>this.cancel(invitation.id)} id="cancel">Cancel Invitation</button>
      </span>
    </td>
    </tr>
    </tbody>
      </table>
    )
  }
  render() {
    return (
      <div className="container">
        <Nav />
        <h5 className="ui dividing header">Invitation Received</h5>
        <div>
          {this.state.invitation_received.map(this.eachInvitationReceived)}
        </div>
        <h5 className="ui dividing header">Invitation Sent</h5>
        <div>
          {this.state.invitation_sent.map(this.eachInvitationSent)}
        </div>
      </div>
    );
  }
}
