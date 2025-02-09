import React, { useState, useMemo, useCallback } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const navLinks = useMemo(
    () => [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/scheduler", label: "Scheduler" },
      { to: "/reports", label: "Reports" },
      { to: "/form", label: "Form" },
    ],
    []
  );

  const toggleNavbar = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg  shadow-sm `}>
      <div className="container">
        <NavLink className="navbar-brand fw-bolder" to="/">
          DevExtreme
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={!isCollapsed ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className={`collapse navbar-collapse ${!isCollapsed ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav   mx-auto  mb-lg-0">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.to}>
                <NavLink
                  to={link.to}
                  className="nav-link"
                  activeClassName="active"
                  exact
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
