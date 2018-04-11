import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import RatingComponent from '../components/RatingComponent';

export default class RatingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.eachRating = this.eachRating.bind(this)
  }
  eachRating(rating,i){
    console.log(rating)
    if (rating.rated || !this.props.myRating){
    return(
      <RatingComponent key={rating.id} rating={rating} user_id={this.props.userId} myRating={this.props.myRating}/>
    )}
  }
  render() {
    return (
      <div>
      {this.props.ratings.map(this.eachRating)}
    </div>
  )
  }
}
