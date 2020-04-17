import React from "react";
import { Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";

function PostLikedUserList({ users }) {
  function renderUsers() {
    return users.map((user) => {
      const { username } = user.attributes;

      return (
        <Dropdown.Item key={user.id}>
          <Link to={`/@${username}`}>{username}</Link>
        </Dropdown.Item>
      );
    });
  }

  return renderUsers();
}

export default PostLikedUserList;
