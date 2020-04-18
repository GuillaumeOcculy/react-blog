import React from "react";
import { List } from "semantic-ui-react";

import ProfileFriendDetail from "./ProfileFriendDetail";

const ProfileFriendListList = ({ users }) => {
  const items = users.map((user) => {
    return <ProfileFriendDetail key={user.id} user={user} />;
  });

  return (
    <List horizontal relaxed>
      {items}
    </List>
  );
};

export default ProfileFriendListList;
