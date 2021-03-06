import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";

import { AuthContext } from "../contexts/AuthContext";
import SearchUsers from "./SearchUsers";

function Navbar() {
  const context = useContext(AuthContext);

  function handleLogout() {
    context.removeAuthToken();

    return <Redirect to="/" />;
  }

  function renderLogout() {
    const username = context.currentUserUsername();
    return (
      <Dropdown icon="user" className="item">
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to={`/@${username}`} text="Profile" />
          <Dropdown.Divider />
          <Dropdown.Item text="Sign out" onClick={handleLogout} />
        </Dropdown.Menu>
      </Dropdown>
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
    // <div className="ui inverted segment borderless top fixed menu">
    <div className="ui inverted segment borderless top  menu">
      <div className="ui text container">
        <Link to="/" className="item">
          Home
        </Link>

        <SearchUsers />

        <div className="right menu">{renderLinks()}</div>
      </div>
    </div>
  );
}

export default Navbar;
