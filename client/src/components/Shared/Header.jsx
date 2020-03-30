import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Navbar.Brand href="/">P.D.R</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto text-white">
          <Link className="nav-link text-white" to="/new-prescription">
            New Prescription
          </Link>
          <Link className="nav-link text-white" to="/patients-prescriptions">
            Patinets Prescriptions
          </Link>
          <Link className="nav-link text-white" to="/about">
            About{" "}
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
