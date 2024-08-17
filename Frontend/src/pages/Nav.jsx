import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import "../styles/Nav.css";
import { Home } from "./Home";
import { Login } from "./Login";
import { Register } from "./Register";
export const Nav = () => {
  return (
    <>
      <div>
        <nav>
          <h1>EventHive</h1>
          <div className="routelist">
            <Link to="/Home" className="route-link">
              Home
            </Link>
            <Link to="/Login" className="route-link">
              Login
            </Link>
            <Link to="/Register" className="route-link">
              Register
            </Link>
          </div>
        </nav>
      </div>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </>
  );
};
