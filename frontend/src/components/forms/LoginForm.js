// import React from "react";
// import PropTypes from "prop-types";
// import { Form, Button, Message } from "semantic-ui-react";
// import Validator from "validator";
// import InlineError from "../messages/InlineError";

// class LoginForm extends React.Component {
//   state = {
//     data: {
//       email: "",
//       password: ""
//     },
//     loading: false,
//     errors: {}
//   };

//   onChange = e =>
//     this.setState({
//       data: { ...this.state.data, [e.target.name]: e.target.value }
//     });

//   onSubmit = () => {
//     const errors = this.validate(this.state.data);
//     this.setState({ errors });
//     if (Object.keys(errors).length === 0) {
//       this.setState({ loading: true });
//       this.props
//         .submit(this.state.data)          // <------------------------
//         .catch(err =>
//           this.setState({ errors: err.response.data.errors, loading: false })
//         );
//     }
//   };

//   // VALIDATE email and password
//   validate = data => {
//     const errors = {};
//     if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
//     if (!data.password) errors.password = "Can't be blank";
//     return errors;
//   };

//   render() {
//       const { data, errors, loading } = this.state;

//       return (

//         <Form onSubmit={this.onSubmit} loading={loading}>
//           {errors.global && (
//             <Message negative>
//               <Message.Header>Something went wrong</Message.Header>
//               <p>{errors.global}</p>
//             </Message>
//           )}
//           <Form.Field error={!!errors.email}>
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="loginEmail"
//               name="email"
//               className="login-form-control"
//               placeholder="User id (Your SFU email)"
//               value={data.email}
//               onChange={this.onChange}
//             />
//             {errors.email && <InlineError text={errors.email} />}
//           </Form.Field>
//           <Form.Field error={!!errors.password}>
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="loginPassword"
//               name="password"
//               className="login-form-control"
//               placeholder="Make it secure"
//               value={data.password}
//               onChange={this.onChange}
//             />
//             {errors.password && <InlineError text={errors.password} />}
//           </Form.Field>
//           <Button primary className="login-form-control right">Sign In</Button>
//         </Form>
//       );
//     }
//   }

//   LoginForm.propTypes = {
//     submit: PropTypes.func.isRequired
//   };

//   export default LoginForm;

import React, {Component} from 'react'
import { Alert, Button,  Form, Container, Row, Col } from 'reactstrap';
import logoImg from "../../assets/logo.png";
import { Link } from 'react-router-dom';

import TextInput from '../TextInput'

export default class LoginForm extends Component {
  state = {
    username: '',
    password: ''
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type ===
        'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state.username, this.state.password)
  }

  render() {
    const errors = this.props.errors || {}

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
      <Container fluid="true">
        <Form onSubmit={this.onSubmit}>
          <Row>
            <Col></Col>
          <Col md={{ size: 3}}>
            <Row>
            <Col></Col>
            <Col>
            <h3>Login</h3>
          </Col>
          <Col></Col>
        </Row>
        <br/>
          {errors.non_field_errors?<Alert color="danger">{errors.non_field_errors}</Alert>:""}
          <TextInput name="username" label="Username" error={errors.username} getRef={input => this.primaryInput = input} onChange={this.handleInputChange}/>
          <TextInput name="password" label="Password" error={errors.password} type="password" onChange={this.handleInputChange}/>
          <Row>
          <Col></Col>
          <Col>
          <Button type="submit" color="primary" size="lg">Log In</Button>
        </Col>
        <Col></Col>
        </Row>
          </Col>
          <Col></Col>
        </Row>
        </Form>
      </Container>
    </div>
      //</Jumbotron>
    )
  }
}
