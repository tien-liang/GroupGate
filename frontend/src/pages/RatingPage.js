import React, { Component } from "react";
import axios from 'axios';
import Nav from '../components/Nav';
import RatingList from '../components/RatingList';

const userId = '5ab60109351f8a12ba4937b2';
export default class Rating extends Component {
  constructor() {
    super();
    this.state = {
      my_ratings: [],
      others_ratings: []
    };
    this.getGroups = this.getGroups.bind(this)
  }
  componentWillMount() {
    this.getGroups();
  }
  getGroups(){
    axios.get(`http://localhost:3000/api/userinfos/${userId}/groupinfos`)
    .then(response => {
      console.log(response.data)
      response.data.map((group)=>{
        axios.get(`http://localhost:3000/api/groupinfos/${group.id}/ratings`)
        .then(ratings_response => {
          console.log(ratings_response.data)
          var myRatings = [];
          var otherRatings = [];
          ratings_response.data.map((rating)=>{
            if (rating.rating_for_id === userId){
              myRatings.push(rating);
            }
            if (rating.user_id === userId){
              otherRatings.push(rating);
            }
          })
          this.setState({my_ratings: myRatings})
          this.setState({others_ratings: otherRatings})
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
        <RatingList ratings={this.state.my_ratings} userId={userId} myRating={true}/>
        <h5 className="ui dividing header">Available Rating for Group Members</h5>
        <RatingList ratings={this.state.others_ratings} userId={userId} myRating={false}/>
      </div>
    );
  }
}
