import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { APP_NAME } from "../../config/appConfig";
import { Logout } from "../../services/auth";

const Header = ({
  type,
  page_title,
  isLogin,
  user,
  darkMode,
  fade,
  page = "",
}) => {
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand
          onClick={() => (isLogin ? navigate("/home") : navigate("/login"))}
        >
          {APP_NAME}
        </Navbar.Brand>
        {isLogin ? (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end"
            >
              <Nav className="me-1">
                <Nav.Link onClick={() => navigate("/home")}>Home</Nav.Link>
                <Nav.Link onClick={() => navigate("/search")}>Search</Nav.Link>
                <NavDropdown
                  title={user != null ? user.firstname : "Please login"}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item onClick={() => navigate("/user/profile")}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => navigate("/user/preferences")}
                  >
                    Preferences
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={Logout}>Sign out</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </>
        ) : (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end"
            >
              <Nav className="me-1">
                <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
                <Nav.Link onClick={() => navigate("/register")}>
                  Register
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
