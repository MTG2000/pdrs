import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

const Header = ({ store }) => {
  const username = store.username;
  const role = store.role;

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Navbar.Brand href="/">P.D.R</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto text-white">
          {role === "Doctor" && (
            <Link className="nav-link text-white" to="/new-prescription">
              New Prescription
            </Link>
          )}
          {(role === "Doctor" || role === "Pharmacy") && (
            <Link className="nav-link text-white" to="/patients-prescriptions">
              Patinets Prescriptions
            </Link>
          )}
          <Link className="nav-link text-white" to="/about">
            About{" "}
          </Link>
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

export default observer(Header);
