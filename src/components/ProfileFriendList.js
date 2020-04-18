import React from "react";
import { Card } from "semantic-ui-react";

import ProfileFriendDetail from "./ProfileFriendDetail";

const ProfileFriendListList = ({ users, handleUnfriend }) => {
  const cards = users.map((user) => {
    return (
      <ProfileFriendDetail
        key={user.id}
        user={user}
        handleUnfriend={handleUnfriend}
      />
    );
  });

  return <Card.Group>{cards}</Card.Group>;
};

export default ProfileFriendListList;
