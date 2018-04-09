import React from "react";
import PropTypes from "prop-types";
import {Modal, Form, Button, Message } from "semantic-ui-react";
import Validator from "validator";
import InlineError from "../messages/InlineError";
import axios from 'axios'
import { Redirect } from 'react-router'

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        email: "",
        displayName: "",
        password: "",
        retypePassword: "",
      },
      loading: false,
      errors: {},
      repeated_email_hidden: true,
      modalOpen: false,
      sign_up_done: false
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)
    this.modalOpen = this.modalOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }


    onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

    onSubmit = () => {
      const errors = this.validate(this.state.data);
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
        axios.post('http://localhost:3000/api/Users', {
          email: this.state.data.email,
          password: this.state.data.password
        })
        .then((response)=>{
          console.log(response.data.id)
          axios.post('http://localhost:3000/api/userinfos', {
            userId: response.data.id,
            display_name: this.state.data.displayName
          })
          .then((response)=>{
            console.log(response)
          })
          .catch((error)=> {
            console.log(error.response)
          });
          console.log(response)
          this.setState({loading:false, modalOpen: true})
        })
        .catch((error)=> {
          console.log(error.response)
          if (error.response && error.response.status === 422){
            this.setState({loading: false,repeated_email_hidden: false})
            setTimeout(function() { this.setState({repeated_email_hidden: true}); }.bind(this), 4000);
            console.log("Email already exists")
          }
        });
      }
    };

    // VALIDATE email and password
    validate = data => {
      const errors = {};
      if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
      if (!data.displayName) errors.displayName = "Can't be blank";
      if (!data.password) errors.password = "Can't be blank";
      if (!data.retypePassword) errors.retypePassword = "Can't be blank";
      if ( data.password !== data.retypePassword) errors.retypePassword = "Passwords do not match";
      return errors;
    };
    modalOpen(){
      this.setState({modalOpen: true})
    }
    handleClose(){
      this.setState({modalOpen: false, sign_up_done: true})
    }
    render() {
      if (this.state.sign_up_done){
        return  <Redirect to='/login' />
      }
      const { data, errors, loading, repeated_email_hidden } = this.state;

      return (
        <div>
        <Modal style={{width: 600, padding: 100}} className="scrolling"
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Modal.Content>
          <h3>Account Signed Up!<br/> Redirect to Login Page!</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleClose} inverted>
            Go
          </Button>
        </Modal.Actions>
      </Modal>
        <Form className="ui form center" onSubmit={this.onSubmit} loading={loading}>
          {<Message negative hidden={this.state.repeated_email_hidden}>
            <Message.Header>Email already existed!</Message.Header>
          </Message>}
          {/*Email Input*/}
          <Form.Field error={!!errors.email}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="loginEmail"
              name="email"
              className="login-form-control"
              placeholder="(Wil be used to Sign In)"
              value={data.email}
              onChange={this.onChange}
            />
            {errors.email && <InlineError text={errors.email} />}
          </Form.Field>
          {/*Display Name Input*/}
          <Form.Field error={!!errors.displayName}>
            <label htmlFor="displayName">Display Name</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              className="login-form-control"
              placeholder="(Your display name)"
              value={data.displayName}
              onChange={this.onChange}
            />
            {errors.displayName && <InlineError text={errors.displayName} />}
          </Form.Field>
          {/*Password Input*/}
          <Form.Field error={!!errors.password}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="login-form-control"
              placeholder="Make it secure"
              value={data.password}
              onChange={this.onChange}
            />
            {errors.password && <InlineError text={errors.password} />}
          </Form.Field>
          {/*Validate Password Input*/}
          <Form.Field error={!!errors.retypePassword}>
            <label htmlFor="retypePassword">Retype Password</label>
            <input
              type="password"
              id="retypePassword"
              name="retypePassword"
              className="login-form-control"
              placeholder="(Make sure they match)"
              value={data.retypePassword}
              onChange={this.onChange}
            />
            {errors.retypePassword && <InlineError text={errors.retypePassword} />}
          </Form.Field>

          <Button primary className="login-form-control right">Crate Profile</Button>
        </Form>
      </div>
      );
    }
  }

  SignUpForm.propTypes = {
    submit: PropTypes.func.isRequired
  };
