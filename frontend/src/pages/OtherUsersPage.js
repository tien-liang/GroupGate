import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
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
      open_modal: false,
      invited_modal: false
    };
    this.getUserName = this.getUserName.bind(this);
    this.getOtherUsers = this.getOtherUsers.bind(this);
    this.invite = this.invite.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openInvitedModal = this.openInvitedModal.bind(this);
    this.closeInvitedModal = this.closeInvitedModal.bind(this);
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
  ratingRender(user){
    if (user.num_of_votes>0){
      return (((user.total_r_skills+user.total_r_comm+user.total_r_psolving+user.total_r_timemngmt+user.total_r_activity)/5)/user.num_of_votes)
    }else{
      return ("No Rating")
    }
  }

  invite(id, invitee_name){
    this.openInvitedModal();
    console.log(id)
    axios.request({
    method:'post',
    url:`http://localhost:3000/api/invitations/`,
    data: {
      inviter_id: userId,
      invitee_id: id,
      inviter_name: this.state.name,
      invitee_name: invitee_name,
      status: "Pending"
    }
    }).then(response => {
      console.log(response )
    }).catch(err => console.log(err));
  }
  openModal(){
    this.setState({open_modal: true});
  }
  closeModal(){
    this.setState({open_modal: false});
  }
  openInvitedModal(){
    this.setState({invited_modal: true});
  }
  closeInvitedModal(){
    this.setState({invited_modal: false});
    this.setState({open_modal: false});
  }
  render() {
    return (

      <div className=" container fluid">
          <Nav />
          <br/>
          {/*render user cards*/}
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
                  <button className="ui bottom attached button" onClick={this.openModal}>
                    + Invite
                  </button>
                  {/*Show confirmation modal when invite button clicked*/}
                  <Modal style={{width: 600, padding: 100}} open={this.state.open_modal} className="scrolling" basic size='small'>
                  <Header icon='warning circle' />
                  <Modal.Content>
                    <p>Are you sure you want to invite {user.display_name} to your group?</p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button basic color='red' inverted onClick={this.closeModal}>
                      <Icon name='remove' /> No
                    </Button>
                    <Button color='green' inverted onClick={()=>this.invite(user.id, user.display_name)}>
                      <Icon name='checkmark' /> Yes
                    </Button>
                  </Modal.Actions>
                </Modal>
                {/*Show invitation sent modal*/}
                <Modal
                  style={{width: 600, padding: 100}}
                  className="scrolling"
                  open={this.state.invited_modal}
                  onClose={this.handleClose}
                  basic
                  size='small'
                >
                  <Header icon='browser' content='Invitation' />
                  <Modal.Content>
                    <h3>Your Invitation is sent!</h3>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color='green' onClick={this.closeInvitedModal} inverted>
                      <Icon name='checkmark' /> Got it
                    </Button>
                  </Modal.Actions>
                </Modal>
                </div>
              )
            })}
          </div>
      </div>
    );
  }
}
