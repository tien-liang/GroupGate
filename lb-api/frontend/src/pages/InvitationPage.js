import React, { Component } from "react";
import axios from 'axios';
import Nav from '../components/Nav';
import { Link } from 'react-router-dom';
import { Feed, Icon } from "semantic-ui-react";
import auth from '../Auth'
const userId = auth.getUserInfo();

export default class Invitation extends Component {
  constructor() {
    super();
    this.state = {
      invitation_received: [],
      invitation_sent: [],
      userinfo: {}
    };
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);
    this.cancel = this.cancel.bind(this);
    this.eachInvitationReceived = this.eachInvitationReceived.bind(this);
    this.eachInvitationSent = this.eachInvitationSent.bind(this);
    this.notification = this.notification.bind(this);
  }

  componentWillMount() {
    this.getUserInfo();
  }

  getUserInfo(){
    axios.get(`http://localhost:3000/api/userinfos?filter={"where":{"userId":{"like":"${userId}"}}}`)
      .then(response => {
        this.setState( {
          userinfo: response.data[0]
          }, () => {
          console.log('MP -> Loading user: ', this.state);
        })
        axios.get(`http://localhost:3000/api/invitations?filter={"where":{"inviter_id":{"like":"${this.state.userinfo.id}"}}} `)
        .then(inviter_response => {
          this.setState( {invitation_sent: inviter_response.data}, () => {
          })
        })
        console.log(this.state.userinfo.userId)
        axios.get(`http://localhost:3000/api/invitations?filter={"where":{"invitee_id":{"like":"${this.state.userinfo.userId}"}}} `)
        .then(invitee_response => {
          this.setState( {invitation_received: invitee_response.data}, () => {
          })
          console.log(this.state.invitation_received)
        })
      })
  }

  //onClick function for accepting invitation received
  accept(invitation){
    //update status to accepted
    axios.request({
      method:'patch',
      url:`http://localhost:3000/api/invitations/${invitation.id}`,
      data: {status: "Accepted"}
    }).then(response => {
      //post rating form for each members
      axios.request({																														//Add group
        method:'post',
        url:`http://localhost:3000/api/groupinfos/${response.data.group_id}/ratings`,
        data: {
          "rating_for_id": invitation.inviter_id,
          "tech_skill": 0,
          "communication": 0,
          "p_solving": 0,
          "timemngmt": 0,
          "activity": 0,
          "rated": false,
          "user_id": this.state.userinfo.id,
        }
      }).then(response => {
      }).catch(err => console.log(err));
      axios.request({																														//Add group
        method:'post',
        url:`http://localhost:3000/api/groupinfos/${response.data.group_id}/ratings`,
        data: {
          "rating_for_id": this.state.userinfo.id,
          "tech_skill": 0,
          "communication": 0,
          "p_solving": 0,
          "timemngmt": 0,
          "activity": 0,
          "rated": false,
          "user_id": invitation.inviter_id,
        }
      }).then(response => {
        axios.request({																														//Add group
          method:'put',
          url:`http://localhost:3000/api/userinfos/${this.state.userinfo.id}/ratings/rel/${response.data.id}`,
          data: {
          }
        }).then(response => {
          console.log( response )
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));

    this.setState(prevState => ({
      invitation_received: prevState.invitation_received.map(
        eachinvitation => (eachinvitation.id !== invitation.id) ? eachinvitation : {...eachinvitation, status: "Accepted"}
      )
    }))

      axios.request({																														//Add group
        method:'put',
        url:`http://localhost:3000/api/groupinfos/${invitation.group_id}/userinfos/rel/${this.state.userinfo.id}`,
        data: {
        }
      }).then(response => {
        console.log( response )
      }).catch(err => console.log(err));
  }



//onClick function for rejecting invitation received
reject(id){
  axios.request({
    method:'patch',
    url:`http://localhost:3000/api/invitations/${id}`,
    data: {status: "Rejected"}
  }).then(response => {
  }).catch(err => console.log(err));
  this.setState(prevState => ({
    invitation_received: prevState.invitation_received.map(
      invitation => (invitation.id !== id) ? invitation : {...invitation, status: "Rejected"}
    )
  }))
}

//onclick function for canceling invitation sent
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

//render each invitation received
eachInvitationReceived(invitation,i){
  //only show pending invitation
  if (invitation.status === "Pending"){
    return(
      <table key={invitation.id} className="ui single line basic table">
        <thead>
          <tr>
            <th className="three wide">{"Inviter"}</th>
            <th>{"Course"}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Link to={`/otherUsers/${invitation.inviter_id}`} >{invitation.inviter_name}</Link></td>
            <td>{invitation.course_number}</td>
          </tr>
          <tr>
            <td colSpan="2">
              <span>
                <button  className="ui red button right floated" onClick={()=>this.reject(invitation.id)} id="reject">Reject</button>
                <button className="ui green button right floated" onClick={()=>this.accept(invitation)} id="accept">Accept</button>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

//render each invitation sent
eachInvitationSent(invitation,i){
  //only show pending invitation
  if (invitation.status === "Pending"){
    return(
      <table key={invitation.id} className="ui single line basic table">
        <thead>
          <tr>
            <th className="three wide">{"Invitee"}</th>
            <th>{"Course"}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Link to={`/otherUsers/${invitation.invitee_id}`} >{invitation.invitee_name}</Link></td>
            <td>{invitation.course_number}</td>
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
}

//Notification for invitation sent (accepted or rejected)
notification(invitation,i){
  if (invitation.status === "Accepted"){
    let summary = invitation.invitee_name + " in " + invitation.course_number + " accepted your invitation.";
    return(
      <Feed key={invitation.id}>
        <Feed.Event>
          <Feed.Label>
            <Icon name="checkmark" color="green"/>
          </Feed.Label>
          <Feed.Content
            summary={summary}
          />
        </Feed.Event>
      </Feed>
    )
  } else if (invitation.status === "Rejected"){
    let summary = invitation.invitee_name+" in " + invitation.course_number + " rejected your invitation.";
    return(
      <Feed>
        <Feed.Event>
          <Feed.Label>
            <Icon name="remove" color="red"/>
          </Feed.Label>
          <Feed.Content
            summary={summary}
          />
        </Feed.Event>
      </Feed>
    )
  }
}


render(){
  return (
    <div className="container">
      <Nav />
      <h5 className="ui dividing header">Notification</h5>
      <div>
        {this.state.invitation_sent.map(this.notification)}
      </div>
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
