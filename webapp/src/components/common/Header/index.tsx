import * as React from 'react';
import { Collapse, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';

import GestionEnmelon from '../../../services/GestionEnmelon';

export default class Header extends React.Component {

    state: any = {
        isOpen: false
    };

	render() {
		return (
			<Navbar dark expand='md'>
                <NavbarBrand href='/'>gestion-enmelon</NavbarBrand>
                <NavbarToggler onClick={() => this.setState({ isOpen: !this.state.isOpen })} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className='ml-auto' navbar>
                        <NavItem>
                            <NavLink onClick={this.onLogoutButtonClick}>Cerrar Sesión</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
		);
    }
    
    onLogoutButtonClick() {
        GestionEnmelon.logout().then(() => {
            window.location.href = `${process.env.PUBLIC_URL}`;
        });
    }

}
