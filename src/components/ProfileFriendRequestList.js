import React from "react";
import { Card } from "semantic-ui-react";
import ProfileFriendRequestDetail from "./ProfileFriendRequestDetail";

const ProfileFriendRequestList = ({ users }) => {
  const cards = users.map((user) => {
    return <ProfileFriendRequestDetail key={user.id} user={user} />;
  });

  return <Card.Group centered>{cards}</Card.Group>;
};

export default ProfileFriendRequestList;
