import React from 'react';

import GestionEnmelon from '../../../services/GestionEnmelon';

export default class Home extends React.Component {

    componentWillMount() {
        if (!GestionEnmelon.tokenExists()) {
            window.location.href = '/login';
        }
    }

    render() {
		return (
            <section />
		);
    }

}
