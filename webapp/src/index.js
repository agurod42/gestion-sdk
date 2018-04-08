import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import App from './components/common/App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
        <App />
    </BrowserRouter>, 
    document.getElementById('root')
);
registerServiceWorker();
