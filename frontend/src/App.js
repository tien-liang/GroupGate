import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage'
import MyProfilePage from './pages/MyProfilePage';
import ProjGroupsPage from './pages/ProjGroupsPage';
import ProjGroupDetails from './pages/ProjGroupDetails';
import OtherUsersPage from './pages/OtherUsersPage';
import AddProjGroup from './pages/AddProjGroup';

const App = () => (

	<Switch>
		<Route path='/' exact component={SignInPage} />
		<Route path='/signup' exact component={SignUpPage} />
		<Route path='/myProfile' exact component={MyProfilePage} />
		<Route path='/projGroups' exact component={ProjGroupsPage} />
		<Route path='/otherUsers' exact component={OtherUsersPage} />
		<Route path='/projGroups/add' exact component={AddProjGroup} />
		<Route path='/projGroups/:id' exact component={ProjGroupDetails} />
	</Switch>

)

export default App;
