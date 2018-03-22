import React from 'react';
import { Route } from 'react-router-dom';

import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage'
import MyProfilePage from './pages/MyProfilePage';
import ProjGroupsPage from './pages/ProjGroupsPage';
import OtherUsersPage from './pages/OtherUsersPage';

const App = () => (
	<div className=" ui container">
		<Route path="/" exact component={SignInPage} />
		<Route path="/signup" exact component={SignUpPage} />
		<Route path="/myProfile" exact component={MyProfilePage} />
		<Route path="/projGroups" exact component={ProjGroupsPage} />
		<Route path="/otherUsers" exact component={OtherUsersPage} />
	</div>
)

export default App;
