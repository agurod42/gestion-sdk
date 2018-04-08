import React from 'react';
import { Col, Row } from 'reactstrap';

import GestionEnmelon from '../../../services/GestionEnmelon';

export default class CareerSubjectsGraph extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            graphNodes: [],
            graphEdges: [] 
        };
    }

    componentWillMount() {
        GestionEnmelon.careerSubjectsGraph(2001).then(res => {
            this.setState({
                graphNodes: res.nodes,
                graphEdges: res.edges
            })
        })
    }

    render() {
		return (
            <Row>
                <Col>
                </Col>
            </Row>
		);
	}

}
