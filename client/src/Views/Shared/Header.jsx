import React from "react";
import { Navbar, Nav, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@material-ui/icons/Language";

const Header = ({ store }) => {
  const username = store.username;
  const role = store.role;

  const changeLanguage = () => {
    if (localStorage.getItem("lang") === "ar")
      localStorage.setItem("lang", "en");
    else localStorage.setItem("lang", "ar");
    window.location.reload();
  };

  const { t } = useTranslation("common");

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
              {t("new prescription")}
            </Link>
          )}
          {role === "Pharmacy" && (
            <Link className="nav-link text-white" to="/dispense-prescription">
              {t("dispense prescription")}
            </Link>
          )}
          {role === "Doctor" && (
            <Link className="nav-link text-white" to="/patients-prescriptions">
              {t("patient prescriptions")}
            </Link>
          )}
          {role === "Admin" && (
            <NavLink className="nav-link text-white" href="/admin">
              {t("admin dashboard")}
            </NavLink>
          )}
          {username && role !== "Admin" && (
            <Link className="nav-link text-white" to="/contact">
              {t("technical support")}
            </Link>
          )}
          {!username && (
            <Link className="nav-link text-white" to="/about">
              {t("about")}
            </Link>
          )}
          {!username ? (
            <Link className="nav-link text-white" to="/login">
              {t("login")}
            </Link>
          ) : (
            <Link
              className="nav-link text-white"
              to="#"
              onClick={async () => {
                await store.Logout();
              }}
            >
              {t("logout")}
            </Link>
          )}
          <button
            href="#"
            className="nav-link text-white border-0"
            onClick={changeLanguage}
            style={{ backgroundColor: "transparent" }}
          >
            <LanguageIcon />
          </button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
