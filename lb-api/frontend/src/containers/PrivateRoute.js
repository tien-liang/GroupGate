import React from 'react'
import { Route, Redirect } from 'react-router'
import auth from '../Auth'
//import { connect } from 'react-redux'
//import * as reducers from '../reducers'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.getToken() !== null ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
/*const mapStateToProps = (state) => ({
  isAuthenticated: reducers.isAuthenticated(state)
})
export default connect(mapStateToProps, null)(PrivateRoute);*/
export default PrivateRoute;
