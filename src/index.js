import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MyProfile from './pages/MyProfile'
import registerServiceWorker from './registerServiceWorker';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<MyProfile />, document.getElementById('root'));
registerServiceWorker();
