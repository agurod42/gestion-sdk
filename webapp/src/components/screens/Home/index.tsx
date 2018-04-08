import * as React from 'react';
import { Button, ButtonGroup, Col, Row } from 'reactstrap';

import GestionEnmelon from '../../../services/GestionEnmelon';

export default class Home extends React.Component {

    render() {
        if (!GestionEnmelon.tokenExists()) {
            window.location.href = '/login';
            return;
        } else {
            return (
                <Row>
                    <Col className='text-center'>
                        <ButtonGroup>
                            <Button onClick={() => window.location.href = '/career-subjects-graph'}>career-subjects-graph</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            );
        }
    }

}
