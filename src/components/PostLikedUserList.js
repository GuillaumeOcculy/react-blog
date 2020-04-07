import React from "react";
import { Dropdown } from "semantic-ui-react";

function PostLikedUserList({ users }) {
  function renderUsers() {
    return users.map((user) => {
      const { first_name, last_name } = user.attributes;

      return (
        <Dropdown.Item key={user.id}>
          {first_name + " " + last_name}
        </Dropdown.Item>
      );
    });
  }

  return renderUsers();
}

export default PostLikedUserList;
