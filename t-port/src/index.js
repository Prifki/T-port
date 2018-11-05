import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from "react-router-dom";
import './css/styles.css';
import App from './components/landing/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
<HashRouter>
    <App />
</HashRouter>
    , document.getElementById('root'));

serviceWorker.unregister();
