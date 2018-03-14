import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import MainPanel from './components/MainPanel';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MainPanel />, document.getElementById('root'));
registerServiceWorker();
