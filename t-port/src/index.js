import React from 'react';
import ReactDOM from 'react-dom';
import './css/styles.css';
import App from './components/landing/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();