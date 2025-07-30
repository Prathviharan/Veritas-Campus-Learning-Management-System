import React, { useState } from "react";
import logo from "../assets/veritas.jpg";
import { Link } from "react-router-dom";

const StudentNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <div className="h-[30px] bg-[#55B649]"></div>
      <nav className="flex flex-wrap items-center justify-between px-6 py-4 bg-white shadow-md relative">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="w-20 h-auto" />
          <div className="h-10 border-l-2 border-black"></div>
          <span className="text-2xl font-bold">LearnDash</span>
        </div>
        console.log("✅ Hamburger JSX runs");

        <button
          className="md:hidden block text-3xl font-bold focus:outline-none bg-black"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
          type="button"
        >
          &#9776; {/* Hamburger icon */}
        </button>
        {/* Navigation Links */}
        <ul
          className={`list-none flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-0 font-bold text-base text-black
            ${menuOpen ? "block" : "hidden"} md:flex`}
        >
          <li>
            <Link
              to="/student/dashboard"
              className="text-black hover:text-green-600 block py-2 md:py-0"
              onClick={() => setMenuOpen(false)}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/student/programme"
              className="text-black hover:text-green-600 block py-2 md:py-0"
              onClick={() => setMenuOpen(false)}
            >
              PROGRAMMES
            </Link>
          </li>
          <li>
            <Link
              to="/student/mycourses"
              className="text-black hover:text-green-600 block py-2 md:py-0"
              onClick={() => setMenuOpen(false)}
            >
              MY COURSES
            </Link>
          </li>
          <li>
            <Link
              to="/student/supportdesk"
              className="text-black hover:text-green-600 block py-2 md:py-0"
              onClick={() => setMenuOpen(false)}
            >
              SUPPORT CENTER
            </Link>
          </li>
          <li>
            <Link
              to="/student/studentProfile"
              className="text-black underline hover:text-green-600 block py-2 md:py-0"
              onClick={() => setMenuOpen(false)}
            >
              My Profile
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default StudentNavbar;
