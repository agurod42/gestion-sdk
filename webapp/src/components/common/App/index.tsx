import * as React from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { Route } from 'react-router-dom';

import Header from '../Header';
import PrivateRoute from '../PrivateRoute';
import CareerSubjectsGraph from '../../screens/CareerSubjectsGraph';
import Home from '../../screens/Home';
import Login from '../../screens/Login';

import './style.css';

export default class App extends React.Component {

	render() {
		return (
			<Grid fluid className='d-flex flex-column h-100'>
				<Row className='header'>
					<Col xs={12}>
						<Header />
					</Col>
				</Row>
				<Row className='content flex-grow'>
					<Col xs={12}>
						<PrivateRoute exact path='/' component={Home} />
						<Route exact path='/career-subjects-graph' component={CareerSubjectsGraph} />
						<Route exact path='/login' component={Login} />
					</Col>
				</Row>
			</Grid>
		);
	}

}
