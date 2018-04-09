import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Modal, Header, Icon } from "semantic-ui-react";


export default class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:"",
      user: this.props.user,
      open_modal: false,
      invited_modal: false,
      tSkill: 0,
      comm: 0,
      psolve: 0,
      time: 0,
      act: 0,
      count: 0
    };
    this.invite = this.invite.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openInvitedModal = this.openInvitedModal.bind(this);
    this.closeInvitedModal = this.closeInvitedModal.bind(this);
  }
  componentWillMount(){
    axios.get(`http://localhost:3000/api/userinfos?filter={"where":{"userId":{"like":"${this.state.user.userId}"}}}`)
      .then(response => {
        if (response.data[0]){
        this.setState( {
          id: response.data[0].id,
          }, () => {
          console.log('MP -> Loading user: ', this.state);
        })}
      })
  }
  componentWillReceiveProps(newProps) {
    this.setState({open_modal: newProps.open_modal});
  }
  getRatings(){
    var tSkill = 0;
    var comm = 0;
    var psolve = 0;
    var time = 0;
    var act = 0;
    var count = 0;
    axios.get(`http://localhost:3000/api/userinfos/${this.props.user.id}/ratings`)
		.then(response =>{
			console.log(response.data)
      response.data.map((rating)=>{
        if (rating.rating_for_id === this.props.user.id && rating.rated){
          count++;
          tSkill+=rating.tech_skill;
          comm+=rating.communication;
          psolve+=rating.p_solving;
          time+=rating.timemngmt;
          act+=rating.activity;
        }
      })
			this.setState({
        tSkill: tSkill,
        comm: comm,
        psolve: psolve,
        time: time,
        act: act,
        count: count
      })
		})
  }
  //Check if there is 0 number of rating.
  ratingRender(user){
    //if more than 0, print the average rating
    if (this.state.count>0){
      return (((this.state.tSkill+this.state.comm+this.state.psolve+this.state.time+this.state.act)/5)/this.state.count)
      //if 0 rating, print No Rating
    }else{
      return ("No Rating")
    }
  }
  //onClick function when user click yes at the modal pop up after clicking invite
  invite(id, invitee_name){
    this.openInvitedModal();
    this.closeModal();
    axios.request({
      method:'post',
      url:`http://localhost:3000/api/groupinfos/${this.props.groupId}/invitations`,
      data: {
        inviter_id: this.props.inviter_id,
        invitee_id: id,
        inviter_name: this.props.inviter_name,
        invitee_name:this.props.user.display_name,
        course_number: this.props.selected_course,
        group_id: this.props.groupId,
        status: "Pending"
      }
    }).then(response => {
      console.log(response )
    }).catch(err => console.log(err));
  }
  //Show confirmation modal
  openModal(){
      this.setState({open_modal: true});
    }
  //Close confirmation modal
  closeModal(){
    this.setState({open_modal: false});
  }
  //Show invitation sent modal
  openInvitedModal(){
    this.setState({invited_modal: true});
  }
  //Close invitation sent modal
  closeInvitedModal(){
    this.setState({invited_modal: false});
  }
  render(){
    console.log(this.state.user)
    return(
      <div className="card">
        <div className="content">
          <div className="header"><Link to={`/otherUsers/${this.state.id}`} >{this.state.user.display_name}</Link></div>
        </div>
        <div className="content">
          Total Score (%): {this.ratingRender(this.state.user)}
          <br/>
          {this.state.user.num_of_votes} Vote(s)
        </div>
        <button className="ui bottom attached button" onClick={this.openModal}>
          + Invite
        </button>
        {/*Show confirmation modal when invite button clicked*/}
        <Modal style={{width: 600, padding: 100}} open={this.state.open_modal} className="scrolling" basic size='small'>
          <Header icon='warning circle' />
          <Modal.Content>
            <p>Are you sure you want to invite {this.state.user.display_name} to your group?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red' inverted onClick={this.closeModal}>
              <Icon name='remove' /> No
            </Button>
            <Button color='green' inverted onClick={()=>this.invite(this.state.user.userId, this.state.user.display_name)}>
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
        {/*Show invitation sent modal*/}
        <Modal
          style={{width: 600, padding: 100}}
          className="scrolling"
          open={this.state.invited_modal}
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
      )}
    }
