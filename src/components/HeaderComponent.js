import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron, Button, 
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false
        };

        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
    return (
        <React.Fragment>
            <Jumbotron fluid>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1>Storm Breaker</h1>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            
            <Navbar dark sticky="top" expand="md">
            <div className="container">
            <NavbarBrand className="mr-auto" href="/"><img src="http://localhost:3001/images/storm.png" height="25" width="30" /></NavbarBrand>
                <NavbarToggler onClick={this.toggleNav} />
                <Collapse isOpen={this.state.isNavOpen} navbar>
                <Nav navbar>
                    <NavItem style={{marginRight: 10}}>
                        <NavLink className="nav-link" to="/home">
                            <i className="fa fa-home fa-sm" /> Home
                        </NavLink>
                    </NavItem>
                    <NavItem style={{marginRight: 10}}>
                        <NavLink className="nav-link" to="/historical">
                            <i className="fa fa-folder fa-sm" /> Historical Reports
                        </NavLink>
                    </NavItem>
                    <NavItem style={{marginRight: 10}}>
                        <NavLink className="nav-link" to="/about">
                            <i className="fa fa-info fa-sm" /> About Us
                        </NavLink>
                    </NavItem>
                    <NavItem style={{marginRight: 10}}>
                        <NavLink className="nav-link" to="/contact">
                            <i className="fa fa-address-card fa-sm" /> Contact
                        </NavLink>
                    </NavItem>
                </Nav>
                </Collapse>
            </div>
            </Navbar>
        </React.Fragment>
    );
    }
}

export default Header;
