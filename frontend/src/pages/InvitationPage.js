import React, { Component } from "react";
import axios from 'axios';
import Nav from '../components/Nav';
import { Button, Form, Select, Grid, TextArea } from "semantic-ui-react";

export default class Invitation extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="container">
        <Nav />
        <h5 className="ui dividing header">Invitation Received</h5>
        <h5 className="ui dividing header">Invitation Sent</h5>
      </div>
    );
  }
}
