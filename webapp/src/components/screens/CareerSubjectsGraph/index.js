import React from 'react';
import { Graph } from 'react-d3-graph';
import { Col, Row } from 'reactstrap';

import GestionEnmelon from '../../../services/GestionEnmelon';

export default class CareerSubjectsGraph extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: {}
        };
    }

    componentWillMount() {
        if (Object.keys(this.state.data).length === 0) {
            GestionEnmelon.careerSubjectsGraph(2001).then(res => {
                this.setState({ 
                    data: res.data,
                    loading: false 
                });
            });
        }
    }

    render() {
		return (
            <Row>
                <Col>
                    { Object.keys(this.state.data).length > 0 &&
                        <Graph
                            id='subjects-graph' // id is mandatory, if no id is defined rd3g will throw an error
                            data={this.state.data}
                            config={{
                                node: {
                                    color: 'lightgreen',
                                    size: 120,
                                    highlightStrokeColor: 'blue'
                                },
                                nodeHighlightBehavior: true,
                                link: {
                                    highlightColor: 'lightblue'
                                }
                            }}
                        />
                    }
                </Col>
            </Row>
		);
	}

}
