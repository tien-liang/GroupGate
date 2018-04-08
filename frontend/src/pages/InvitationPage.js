import React, { Component } from "react";
import axios from 'axios';
import Nav from '../components/Nav';
import { Link } from 'react-router-dom';
import { Feed, Icon } from "semantic-ui-react";
import auth from '../Auth'
const userId = auth.getUserInfo();

const BASE_URL = 'http://localhost:3000';
const url= `${BASE_URL}/api/invitations`;

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
        axios.get(`${url}?filter={"where":{"inviter_id":{"like":"${this.state.id}"}}} `)
        .then(inviter_response => {
          this.setState( {invitation_sent: inviter_response.data}, () => {
          })
        })
        axios.get(`${url}?filter={"where":{"invitee_id":{"like":"${this.state.id}"}}} `)
        .then(invitee_response => {
          this.setState( {invitation_received: invitee_response.data}, () => {
          })
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
          "user_id": invitation.invitee_id,
        }
      }).then(response => {
      }).catch(err => console.log(err));
      axios.request({																														//Add group
        method:'post',
        url:`http://localhost:3000/api/groupinfos/${response.data.group_id}/ratings`,
        data: {
          "rating_for_id": invitation.invitee_id,
          "tech_skill": 0,
          "communication": 0,
          "p_solving": 0,
          "timemngmt": 0,
          "activity": 0,
          "rated": false,
          "user_id": invitation.inviter_id,
        }
      }).then(response => {
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));

    this.setState(prevState => ({
      invitation_received: prevState.invitation_received.map(
        eachinvitation => (eachinvitation.id !== invitation.id) ? eachinvitation : {...eachinvitation, status: "Accepted"}
      )
    }))

    axios.request({																														//Add group
      method:'post',
      url:`http://localhost:3000/api/groupinfos/${invitation.group_id}/userinfos`,
      data: {
        "display_name": this.state.userinfo.display_name,
        "about_me": this.state.userinfo.about_me,
        "references": this.state.userinfo.references,
        "groups_owned": this.state.userinfo.groups_owned,
        "groups_joined": this.state.userinfo.groups_joined,
        "total_r_skills": this.state.userinfo.total_r_skills,
        "total_r_comm": this.state.userinfo.total_r_comm,
        "total_r_psolving": this.state.userinfo.total_r_psolving,
        "total_r_timemngmt": this.state.userinfo.total_r_timemngmt,
        "total_r_activity": this.state.userinfo.total_r_activity,
        "num_of_votes": this.state.userinfo.num_of_votes,
        "user_id": this.state.userinfo.id
      }
    }).then(response => {
      console.log( response )
    }).catch(err => console.log(err));

    axios.get(`http://localhost:3000/api/groupinfos/${invitation.group_id}`)
    .then(response =>{
      console.log(response.data)
      var group = response.data;
      axios.request({																														//Add group
        method:'post',
        url:`http://localhost:3000/api/userinfos/${this.state.userinfo.id}/groupinfos`,
        data: {
          "group_name": group.group_name,
          "group_descr": group.group_descr,
          "group_status": group.group_status,
          "group_course": group.group_course,
          "group_url": group.group_url,
          "group_gitlink": group.group_gitlink,
          "group_owner": this.state.id
        }
      }).then(response => {
        console.log( response )
      }).catch(err => console.log(err));
    })
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
    let summary = invitation.invitee_name+" rejected your invitation.";
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
