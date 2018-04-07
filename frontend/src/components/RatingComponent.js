import React, { Component } from "react";
import axios from 'axios';
import { Card, Button, Rating } from "semantic-ui-react";

export default class RatingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {},
      tech_skill: this.props.rating.tech_skill,
      communication: this.props.rating.communication,
      p_solving: this.props.rating.p_solving,
      timemngmt: this.props.rating.timemngmt,
      activity: this.props.rating.activity,
      rating_for: ""
    };
    this.handleTSRate = this.handleTSRate.bind(this)
    this.handleCRate = this.handleCRate.bind(this)
    this.handlePSRate = this.handlePSRate.bind(this)
    this.handleTRate = this.handleTRate.bind(this)
    this.handleARate = this.handleARate.bind(this)
    this.submit = this.submit.bind(this)
    this.getCourse = this.getCourse.bind(this)
    this.getRatingFor = this.getRatingFor.bind(this)
    this.renderDisplay = this.renderDisplay.bind(this)
  }
  componentDidMount() {
    this.getCourse();
    this.getRatingFor();
  }
  getCourse(){
    axios.get(`http://localhost:3000/api/groupinfos/${this.props.rating.group_id}/courseinfos`)
    .then(response => {
      console.log(response.data)
      this.setState({course: response.data})
    }).catch(err => console.log(err));
  }
  getRatingFor(){
    axios.get(`http://localhost:3000/api/userinfos/${this.props.rating.rating_for_id}`)
    .then(response => {
      console.log(response.data)
      this.setState({rating_for: response.data.display_name})
    }).catch(err => console.log(err));
  }
  handleTSRate(e, rating){
    this.setState({tech_skill: rating})
  }
  handleCRate(e, rating){
    this.setState({communication: rating})
  }
  handlePSRate(e, rating){
    this.setState({p_solving: rating})
  }
  handleTRate(e, rating){
    this.setState({timemngmt: rating})
  }
  handleARate(e, rating){
    this.setState({activity: rating})
  }
  submit(){
    axios.request({																														//Add group
      method:'post',
      url:`http://localhost:3000/api/userinfos/${this.props.user_id}/ratings`,
      data: {
        "rating_for_id": this.props.user_id,
        "tech_skill": this.state.tech_skill,
        "communication": this.state.communication,
        "p_solving": this.state.p_solving,
        "timemngmt": this.state.timemngmt,
        "activity": this.state.activity,
        "group_id": this.props.group_id,
        "rated": true
      }
    }).then(response => {
      console.log( response )
    }).catch(err => console.log(err));
  }
  renderDisplay(course){
    if (this.props.myRating){
      return(
        <Card>
          <Card.Content>
            <Card.Header>
              {course.course_number}
            </Card.Header>
            <Card.Meta>
              {course.term_year} {course.term_semester}
            </Card.Meta>
          </Card.Content>
          <Card.Content>
            Technical Skill <Rating defaultRating={this.state.tech_skill} maxRating={5} disabled onRate={this.handleTSRate}/><br/>
            Communication <Rating defaultRating={this.state.communication} maxRating={5} disabled onRate={this.handleCRate}/><br/>
            Problem Solving <Rating defaultRating={this.state.p_solving} maxRating={5} disabled onRate={this.handlePSRate}/><br/>
            Time Management <Rating defaultRating={this.state.timemngmt} maxRating={5} disabled onRate={this.handleTRate}/><br/>
            Activity <Rating defaultRating={this.state.activity} maxRating={5} disabled onRate={this.handleARate}/><br/>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green' onClick={this.submit}>Submit</Button>
            </div>
          </Card.Content>
        </Card>
      )
    }else{
      return(
        <Card>
          <Card.Content>
            <Card.Header>
              {this.state.course.course_number}
            </Card.Header>
            <Card.Meta>
              {this.state.course.term_year} {this.state.course.term_semester}
            </Card.Meta>
            <Card.Description>
              Rating for {this.state.rating_for}
            </Card.Description>
          </Card.Content>
          <Card.Content>
            Technical Skill <Rating defaultRating={this.state.tech_skill} maxRating={5} onRate={this.handleTSRate}/><br/>
            Communication <Rating defaultRating={this.state.communication} maxRating={5} onRate={this.handleCRate}/><br/>
            Problem Solving <Rating defaultRating={this.state.p_solving} maxRating={5} onRate={this.handlePSRate}/><br/>
            Time Management <Rating defaultRating={this.state.timemngmt} maxRating={5} onRate={this.handleTRate}/><br/>
            Activity <Rating defaultRating={this.state.activity} maxRating={5} onRate={this.handleARate}/><br/>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green' onClick={this.submit}>Submit</Button>
            </div>
          </Card.Content>
        </Card>
      )
    }
  }
  render() {
    return this.renderDisplay(this.state.course);
  }
}
