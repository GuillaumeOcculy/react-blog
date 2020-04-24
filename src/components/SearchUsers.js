import React, { useState } from "react";
import { Search, Grid } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import _ from "lodash";

import BlogAPI from "../apis/BlogAPI";

const SearchUsers = () => {
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

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default SearchUsers;
