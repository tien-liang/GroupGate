import React from 'react';
import { Switch, Route } from 'react-router-dom';


// import SignUpPage from './pages/SignUpPage'
import MyProfilePage from './pages/MyProfilePage';
import ProjGroupsPage from './pages/ProjGroupsPage';
import OtherUsersPage from './pages/OtherUsersPage';
import OtherUserDetails from './components/OtherUserDetails';
import RatingPage from './pages/RatingPage';

const App = () => (

	<Switch>
		{/* <Route path='/' exact component={SignInPage} /> */}
		{/* <Route path='/signup' exact component={SignUpPage} /> */}
		<Route path='/' exact component={MyProfilePage} />
		<Route path='/projGroups' exact component={ProjGroupsPage} />
		<Route path='/otherUsers' exact component={OtherUsersPage} />
		<Route path='/otherUsers/:id' exact component={OtherUserDetails} />
		<Route path='/rating' exact component={RatingPage}/>
	</Switch>

)

export default App;
