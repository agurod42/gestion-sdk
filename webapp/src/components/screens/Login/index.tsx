import * as React from 'react';
import { Button, Col, Form, FormFeedback, FormGroup, Input, InputGroup, InputGroupAddon, Row } from 'reactstrap';

import GestionEnmelon from '../../../services/GestionEnmelon';

import './style.css';

export default class Login extends React.Component {

    state = {
        data: {
            username: '',
            password: ''
        },
        errors: {
            username: null,
            password: null
        },
        loading: false,
    };

    render() {
		return (
            <Row>
                <Col xs={{ size: 4, offset: 4 }}>
                    <Form>
                        <FormGroup>
                            <InputGroup>
                                <InputGroupAddon addonType='prepend'>u</InputGroupAddon>
                                <Input 
                                    placeholder='Usuario'
                                    invalid={this.state.errors.username != null} 
                                    onChange={(e) => this.setState({ data: { ...this.state.data, username: e.target.value } })}
                                />
                            </InputGroup>
                            { this.state.errors.username &&
                                <FormFeedback>{this.state.errors.username}</FormFeedback>
                            }
                        </FormGroup>
                        <FormGroup>
                            <InputGroup>
                                <InputGroupAddon addonType='prepend'>p</InputGroupAddon>
                                <Input 
                                    type='password'
                                    placeholder='Contraseña' 
                                    invalid={this.state.errors.password != null} 
                                    onChange={(e) => this.setState({ data: { ...this.state.data, password: e.target.value } })}
                                />
                            </InputGroup>
                            { this.state.errors.password &&
                                <FormFeedback>{this.state.errors.password}</FormFeedback>
                            }
                        </FormGroup>
                        <div className='text-center'>
                            <Button onClick={this.onLoginButtonClick}>Iniciar Sesión</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
		);
    }
    
    onLoginButtonClick() {
        this.setState({ loading: true });

        GestionEnmelon.login(this.state.data.username, this.state.data.password).then(res => {
            window.location.href = '/';
        });
    }

}
