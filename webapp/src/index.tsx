/// <reference types="node" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/common/App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
        <App />
    </BrowserRouter>, 
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
