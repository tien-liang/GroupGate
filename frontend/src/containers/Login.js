import React, {Component} from 'react'
import logoImg from "../assets/logo.png";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'
import axios from 'axios'
import { Form, Button, Message, Grid } from "semantic-ui-react";
import Validator from "validator";
import InlineError from "../components/messages/InlineError";
import auth from '../Auth'
import TextInput from '../components/TextInput'

export default class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
    loading: false,
    errorMsg_hidden: true,
    login: false
  }

  emailOnChange = e =>
  this.setState({
    email: e.target.value
  });
  passwordOnChange = e =>
  this.setState({
    password: e.target.value
  });

  onSubmit = (event) => {
    event.preventDefault()
    const errors = this.validate(this.state.email,this.state.password);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      //this.setState({ loading: true });
      axios.post('http://localhost:3000/api/Users/login', {
        email: this.state.email,
        password: this.state.password
      }).then(function (response) {
        auth.setToken(response.data.id)
        auth.setUserInfo(response.data.userId)
        this.setState({loading: false, login: true})
        console.log(response.data.userId)
      }).catch((error)=> {
          if (error.response && error.response.status === 401){
            this.setState({loading: false,errorMsg_hidden: false})
            setTimeout(function() { this.setState({errorMsg_hidden: true}); }.bind(this), 4000);
          }
      });
    }
  }
  // VALIDATE email and password
  validate = (email,password) => {
    const errors = {};
    if (!Validator.isEmail(email)) errors.email = "Invalid email";
    if (!password) errors.password = "Can't be blank";
    return errors;
  };

  render() {
    if (auth.getToken() !== null){
      return  <Redirect to='/' />
    }
    return (
      //<Jumbotron className="container">
      <div className="container-fluid">
        <nav className="navbar">
          <img className="logo" src={logoImg} alt="Logo" width="50"/>
          <h1 className="mr-auto">Group Gate</h1>
          <Link to="/signup">Sign Up</Link>
        </nav><br/><br/>
        <h2 className="text-center notBold">Starting new class or personal group project? </h2>
        <h2 className="text-center notBold">Find the right people. Fast.</h2><br/>
        <h5 className="text-center notBold">Create Group. Find People. Finish Project. Provide Feedback.</h5><br/><br/>
        <Grid centered>
        {<Message className = "center" compact negative hidden={this.state.errorMsg_hidden}>
          <Message.Header>Wrong Email or Password</Message.Header>
        </Message>}
      </Grid>
      <br/>
      <br/>
        <div className="d-flex justify-content-center">
        <Form className="ui form center" onSubmit={this.onSubmit} loading={this.state.loading}>
          {/*Email Input*/}
          <Form.Field error={!!this.state.errors.email}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="loginEmail"
              name="email"
              className="login-form-control"
              value={this.state.email}
              onChange={this.emailOnChange}
            />
            {this.state.errors.email && <InlineError text={this.state.errors.email} />}
          </Form.Field>
          {/*Password Input*/}
          <Form.Field error={!!this.state.errors.password}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="login-form-control"
              value={this.state.password}
              onChange={this.passwordOnChange}
            />
            {this.state.errors.password && <InlineError text={this.state.errors.password} />}
          </Form.Field>
          <Button primary className="login-form-control right">Login</Button>
        </Form>
        </div>
    </div>
    )
  }
}
