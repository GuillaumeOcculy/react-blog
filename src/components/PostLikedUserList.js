import React from "react";
import { Dropdown } from "semantic-ui-react";

function PostLikedUserList({ users }) {
  function renderUsers() {
    return users.map((user) => {
      const { username } = user.attributes;

      return <Dropdown.Item key={user.id}>{username}</Dropdown.Item>;
    });
  }

  return renderUsers();
}

export default PostLikedUserList;
