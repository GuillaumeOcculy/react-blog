import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="ui inverted segment">
      <div className="ui inverted secondary menu container">
        <Link to="/" className="item">
          Home
        </Link>
        <Link to="/about" className="item">
          About
        </Link>
        <Link to="/signup" className="item">
          Sign up
        </Link>
        <Link to="/signin" className="item">
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
