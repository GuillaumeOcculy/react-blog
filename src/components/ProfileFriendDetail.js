import React from "react";
import { Image, List } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ProfileFriendDetail = ({ user }) => {
  const { username } = user.attributes;

  return (
    <List.Item>
      <Image
        avatar
        src="https://react.semantic-ui.com/images/avatar/small/daniel.jpg"
      />
      <List.Content>
        <List.Header as={Link} to={`/@${username}`}>
          {username}
        </List.Header>
      </List.Content>
    </List.Item>
  );
};

export default ProfileFriendDetail;
