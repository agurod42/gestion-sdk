import React from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

import Header from '../Header';
import CareerSubjectsGraph from '../../screens/CareerSubjectsGraph';
import Home from '../../screens/Home';
import Login from '../../screens/Login';

import GestionEnmelon from '../../../services/GestionEnmelon';

import './style.css';

const PrivateRoute = ({ component: Component, app, ...props }) => (
    <Route 
        {...props} 
        render={props => (
            GestionEnmelon.tokenExists() ? <Component {...props} /> : <Redirect to={{ pathname: `/login` }} />
        )}
    />
);

export default class App extends React.Component {

	render() {
		return (
			<Grid fluid className='d-flex flex-column h-100'>
				<Row id='header'>
					<Col xs={12}>
			    		<Header />
					</Col>
				</Row>
				<Row id='content' style={{ flexGrow: 1 }}>
					<Col xs={12}>
						<PrivateRoute exact path='/' component={Home} />
						<PrivateRoute exact path='/career-subjects-graph' component={CareerSubjectsGraph} />
						<Route exact path='/login' component={Login} />
					</Col>
				</Row>
			</Grid>
		);
	}

}
