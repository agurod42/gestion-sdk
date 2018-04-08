import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import Header from '../Header';
import CareerSubjectsGraph from '../../screens/CareerSubjectsGraph';
import Login from '../../screens/Login';

import './style.css';

export default class App extends React.Component {

	render() {
		return (
			<div>
			    <Header />
            	<Container fluid id='main-container'>
					<Route exact path='/login' component={Login} />
					<Route exact path='/career-subjects-graph' component={CareerSubjectsGraph} />
				</Container>
			</div>
		);
	}

}
