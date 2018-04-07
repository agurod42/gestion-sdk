import React from 'react';
import Header from '../Header';

import GestionEnmelon from '../../services/GestionEnmelon';

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
        };
    }

    componentWillMount() {
        GestionEnmelon.login('194412', 'F3d320102').then(res => {
            console.log(res)
        })
    }

    render() {
		return (
            <div>
			    <Header />

            </div>
		);
	}

}
