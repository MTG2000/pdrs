import React from "react";
import { Navbar, Nav, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = ({ store }) => {
  const username = store.username;
  const role = store.role;

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      variant="dark"
      style={{ zIndex: 100 }}
    >
      <Navbar.Brand href="/">
        <h4 className="no-gutters mb-0">P.D.R.S</h4>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto text-white">
          {role === "Doctor" && (
            <Link className="nav-link text-white" to="/new-prescription">
              New Prescription
            </Link>
          )}
          {role === "Pharmacy" && (
            <Link className="nav-link text-white" to="/dispense-prescription">
              Dispense Prescription
            </Link>
          )}
          {role === "Doctor" && (
            <Link className="nav-link text-white" to="/patients-prescriptions">
              Patinets Prescriptions
            </Link>
          )}
          {role === "Admin" && (
            <NavLink className="nav-link text-white" href="/admin">
              Admin Dashboard
            </NavLink>
          )}
          {username && role !== "Admin" && (
            <Link className="nav-link text-white" to="/contact">
              Technical Support
            </Link>
          )}
          {!username && (
            <Link className="nav-link text-white" to="/about">
              About{" "}
            </Link>
          )}
          {!username ? (
            <Link className="nav-link text-white" to="/login">
              Login
            </Link>
          ) : (
            <Link
              className="nav-link text-white"
              to="#"
              onClick={() => {
                store.Logout();
                window.location = "/login";
              }}
            >
              Logout
            </Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
