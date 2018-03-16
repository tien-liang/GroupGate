import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Login from './components/Login';
import registerServiceWorker from './registerServiceWorker';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<Login />, document.getElementById('root'));
registerServiceWorker();
