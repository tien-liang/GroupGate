import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import Login from './containers/Login';
import PrivateRoute from './containers/PrivateRoute';
import SignUpPage from './pages/SignUpPage'
import {BrowserRouter,Switch, Route} from 'react-router-dom'


ReactDOM.render((
    <BrowserRouter>
		<Switch>
			<Route exact path="/login/" component={Login} />
			<Route path='/signup' exact component={SignUpPage} />
			<PrivateRoute path="/" component={App}/>
		</Switch>
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
