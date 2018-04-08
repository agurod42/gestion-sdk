import React from 'react';
import { Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, UncontrolledDropdown, } from 'reactstrap';

export default class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

	render() {
		return (
			<Navbar dark expand='md'>
                <NavbarBrand href='/'>gestion-enmelon</NavbarBrand>
                <NavbarToggler onClick={() => this.setState({ isOpen: !this.state.isOpen })} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className='ml-auto' navbar>
                    <NavItem>
                        <NavLink href="/components">Components</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                    </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
		);
	}

}
