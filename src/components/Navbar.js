import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Dropdown, Search, Grid } from "semantic-ui-react";
import _ from "lodash";

import { AuthContext } from "../contexts/AuthContext";
import BlogAPI from "../apis/BlogAPI";

function Navbar() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState();
  const [userSelected, setUserSelected] = useState(false);

  const handleResultSelect = (e, { result }) => {
    setValue(result.title);
    setUserSelected(true);
  };

  const RedirectToUser = () => {
    if (!userSelected) {
      return null;
    }

    return <Redirect to={`/@${value}`} />;
  };

  const handleSearchChange = async (e, { value }) => {
    setIsLoading(true);
    setValue(value);

    const response = await BlogAPI.get(`/searches?q=${value}`);
    const data = response.data.data;

    const users = data.map((element) => {
      return {
        title: element.attributes.username,
      };
    });

    setResults(users);
    setIsLoading(false);
  };

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

        <Grid>
          <Grid.Column width={6}>
            <Search
              loading={isLoading}
              onResultSelect={handleResultSelect}
              onSearchChange={_.debounce(handleSearchChange, 500, {
                leading: true,
              })}
              results={results}
              value={value}
            />
          </Grid.Column>
        </Grid>

        <RedirectToUser />

        <div className="right menu">{renderLinks()}</div>
      </div>
    </div>
  );
}

export default Navbar;
