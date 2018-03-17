import React from 'react';
import { Route } from 'react-router-dom';
import MyProfilePage from './pages/MyProfilePage';
import LoginPage from './pages/LoginPage';

const App = () => (
	<div className=" ui container">
		<Route path="/" exact component={LoginPage} />
		<Route path="/mypProfile" exact component={MyProfilePage} />
	</div>

)

export default App;
