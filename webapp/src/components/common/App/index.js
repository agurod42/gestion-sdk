import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import Header from '../Header';
import CareerSubjectsGraph from '../../screens/CareerSubjectsGraph';
import Home from '../../screens/Home';
import Login from '../../screens/Login';

import './style.css';

export default class App extends React.Component {

	render() {
		return (
			<div>
			    <Header />
            	<Container fluid id='main-container'>
					<Route exact path='/' component={Home} />
					<Route exact path='/career-subjects-graph' component={CareerSubjectsGraph} />
					<Route exact path='/login' component={Login} />
				</Container>
			</div>
		);
	}

}
