// CURRENTLY NOT USED
// 2018-03-17, Otakar: have to think about at what level to manage the state

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";

import EditableField from '../EditableField'
import EditableTextArea from '../EditableTextArea'

import InlineError from "../messages/InlineError";
import Validator from "validator";


export default class UserInfoForm extends Component {
  state = {
    data: {
      displayName: "",
      aboutMe: ""
    },
    loading: false,
    errors: {}
  };









  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)          // <------------------------
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  // VALIDATE display name (empty)
  validate = data => {
    const errors = {};
    if (!Validator.isEmpty(data.displayName)) errors.email = "Display Name is required";
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };

  render() {
      const { data, errors, loading } = this.state;

      return (
        <div>
          <div>
            <h5>Display Name</h5>
            <EditableField label=""
                            value = {this.state.displayNameText}
                            onChange = {this.updateDisplayName} />
            <h5>About Me</h5>
            <EditableTextArea label=""
                              value = {this.state.aboutMeText}
                              onChange = {this.updateAboutMe} />
            <h5>My Classes with Group projects </h5>


          </div>
        </div>



      );
    }
  }

  UserInfoForm.propTypes = {
    submit: PropTypes.func.isRequired
  };



/*

<Form onSubmit={this.onSubmit} loading={loading}>
  {errors.global && (
    <Message negative>
      <Message.Header>Something went wrong</Message.Header>
      <p>{errors.global}</p>
    </Message>
  )}


  <div>
    <h5>Display Name</h5>
    <EditableField label=""
                    value = {this.state.displayNameText}
                    onChange = {this.updateDisplayName} />
    <h5>About Me</h5>
    <EditableTextArea label=""
                      value = {this.state.aboutMeText}
                      onChange = {this.updateAboutMe} />
    <h5>My Classes with Group projects </h5>


  </div>




  <Form.Field error={!!errors.email}>
    <label htmlFor="displayName">Display Name</label>
    <input
      type="text"
      id="displayName"
      name="displayName"
      className="login-form-control"
      placeholder="User id (Your SFU email)"
      value={data.email}
      onChange={this.onChange}
    />
    {errors.email && <InlineError text={errors.email} />}
  </Form.Field>
  <Form.Field error={!!errors.password}>
    <label htmlFor="password">Password</label>
    <textarea
      type="password"
      id="loginPassword"
      name="password"
      className="login-form-control"
      placeholder="Make it secure"
      value={data.password}
      onChange={this.onChange}
    />
    {errors.password && <InlineError text={errors.password} />}
  </Form.Field>

</Form>



*/
