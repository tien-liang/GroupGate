import React from 'react';
import { Route } from 'react-router-dom';
import MyProfilePage from './pages/MyProfilePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage'

const App = () => (
	<div className=" ui container">
		<Route path="/" exact component={SignInPage} />
		<Route path="/signup" exact component={SignUpPage} />
		<Route path="/myProfile" exact component={MyProfilePage} />

	</div>
)

export default App;
