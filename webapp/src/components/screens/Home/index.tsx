import * as React from 'react';
import { Button, ButtonGroup, Col, Row } from 'reactstrap';

import GestionEnmelon from '../../../services/GestionEnmelon';

export default class Home extends React.Component {

    render() {
        if (!GestionEnmelon.tokenExists()) {
            window.location.href = `${process.env.PUBLIC_URL}/login`;
            return;
        } else {
            return (
                <Row>
                    <Col className='text-center'>
                        <ButtonGroup>
                            <Button onClick={() => window.location.href = `${process.env.PUBLIC_URL}/career-subjects-graph`}>career-subjects-graph</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            );
        }
    }

}
