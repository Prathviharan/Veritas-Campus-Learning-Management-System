import React from "react";
import logo from "../assets/veritas.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div style={{ height: "30px", backgroundColor: "#55B649" }}></div>
      <nav className="navbar   px-4 navbar-expand-sm">
        <div className="navbar-brand">
          <img
            src={logo}
            alt="Logo"
            width="80"
            height="70"
            className="d-inline-block me-1"
          />
          <span
            style={{
              height: "40px",
              borderLeft: "2px solid #000",
              marginRight: "15px",
            }}
          ></span>
          <span className="fw-bold fs-2">LearnDash</span>
        </div>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#NavbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="NavbarMenu"
        >
          <ul className="navbar-nav fw-bold fs-6">
            <li className="nav-item">
              <Link className="nav-link" to="/student/dashboard">
                HOME
              </Link>
            </li>

            <li className="nav-item me-3">
              <Link to="/quiz" className="nav-link">
                PROGRAMMES
              </Link>
            </li>

            <li className="nav-item me-3">
              <Link to="/mycourses" className="nav-link">
                MY COURSES
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link to="/supportdesk" className="nav-link">
                SUPPORT CENTER
              </Link>
            </li>

            <li className="nav-item me-3">
              <Link
                to="/studentProfile"
                className="nav-link text-decoration-underline"
              >
                GET STARTED
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
