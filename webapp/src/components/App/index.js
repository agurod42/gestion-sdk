import React from 'react';
import { Route } from 'react-router-dom';

import CareerSubjectsGraph from '../CareerSubjectsGraph';

import './style.css';

export default class App extends React.Component {

	render() {
		return (
			<div>
				{/* <Route exact path='/login' component={Login} />
                <Route exact path='/logout' component={Logout} /> */}
                <Route exact path='/career-subjects-graph' component={CareerSubjectsGraph} />
			</div>
		);
	}

}
