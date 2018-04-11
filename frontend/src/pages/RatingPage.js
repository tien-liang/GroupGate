import React, { Component } from "react";
import axios from 'axios';
import Nav from '../components/Nav';
import RatingList from '../components/RatingList';

import auth from '../Auth'
const userId = auth.getUserInfo();
export default class Rating extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      my_ratings: [],
      others_ratings: []
    };
  }
  componentWillMount() {
    this.getUserInfo();
  }

  getUserInfo(){
    axios.get(`http://localhost:3000/api/userinfos?filter={"where":{"userId":{"like":"${userId}"}}}`)
      .then(response => {
        this.setState( {
          id: response.data[0].id
          }, () => {
          console.log('MP -> Loading user: ', this.state);
        })
        axios.get(`http://localhost:3000/api/userinfos/${this.state.id}/groupinfos`)
        .then(group_response => {
          group_response.data.map((group)=>{
            axios.get(`http://localhost:3000/api/groupinfos/${group.id}/ratings`)
            .then(ratings_response => {
              console.log(ratings_response.data)
              var myRatings = [];
              var otherRatings = [];
              ratings_response.data.map((rating)=>{
                if (rating.rating_for_id === this.state.id){
                  myRatings.push(rating);
                }
                if (rating.user_id === this.state.id){
                  otherRatings.push(rating);
                }
              })
              this.setState({my_ratings: myRatings})
              this.setState({others_ratings: otherRatings})
            })
          })

        })
      })
  }
  render() {
    return (
      <div className="container">
        <Nav />
        <br/><br/>
        <h5 className="ui dividing header">My Rating</h5>
        <RatingList ratings={this.state.my_ratings} userId={this.state.id} myRating={true}/>
        <h5 className="ui dividing header">Available Rating for Group Members</h5>
        <RatingList ratings={this.state.others_ratings} userId={this.state.id} myRating={false}/>
      </div>
    );
  }
}
