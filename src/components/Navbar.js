import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

function Navbar() {
  const context = useContext(AuthContext);

  function handleLogout() {
    context.removeToken();
    return <Redirect to="/" push={true} />;
  }

  function renderLogout() {
    return (
      <Link to="/" onClick={handleLogout} className="item">
        Log out
      </Link>
    );
  }

  function renderSignUpIn() {
    return (
      <React.Fragment>
        <Link to="/signup" className="item">
          Sign up
        </Link>
        <Link to="/signin" className="item">
          Sign in
        </Link>
      </React.Fragment>
    );
  }

  function renderLinks() {
    if (context.authToken) {
      return renderLogout();
    } else {
      return renderSignUpIn();
    }
  }

  return (
    <div className="ui inverted segment">
      <div className="ui inverted secondary menu container">
        <Link to="/" className="item">
          Home
        </Link>
        <Link to="/about" className="item">
          About
        </Link>

        {renderLinks()}
      </div>
    </div>
  );
}

export default Navbar;
