import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Navbar,
  Nav,
 
} from "react-bootstrap";
import "./style.css";

export const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <NavLink className="text-secondary h2 nav-link" to="/">
          RE.TECH
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto navbar-dark">
           
          <Nav.Link>
            <Link
              exact
              activeClassName="text-success border-bottom"
              className="text-secondary nav-link"
              to="/adminDashboard"
            >
              Admin Dashboard
            </Link>
          </Nav.Link>
           

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
// export default Header;
