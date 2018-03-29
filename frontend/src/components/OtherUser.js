import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Button } from "semantic-ui-react";

export default class UserItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      user: props.item
    }
    this.ratingRender = this.ratingRender.bind(this)
  }

  ratingRender(user){
    if (user.num_of_votes>0){
      return (<td>{((user.total_r_skills+user.total_r_comm+user.total_r_psolving+user.total_r_timemngmt+user.total_r_activity)/5)/user.num_of_votes}</td>)
    }else{
      return (<td>No Rating</td>)
    }
  }



  render() {
    const user = this.state.user;
    return(

          <div>
            <td>
              <Link to={`/otherUsers/${user.id}`} >{user.display_name}</Link>


            {this.ratingRender(user)}
            <td>{user.num_of_votes}</td>
            <td><Button basic color="blue">Invite</Button></td>

          </div>

    )

  }


}
