import React from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import { Container } from 'reactstrap';

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
			<div>
			    <Header />
            	<Container fluid id='main-container'>
					<PrivateRoute exact path='/' component={Home} />
					<PrivateRoute exact path='/career-subjects-graph' component={CareerSubjectsGraph} />
					<Route exact path='/login' component={Login} />
				</Container>
			</div>
		);
	}

}
