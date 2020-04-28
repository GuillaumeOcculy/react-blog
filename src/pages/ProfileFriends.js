import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header, Icon } from "semantic-ui-react";

import ProfileFriendList from "./../components/ProfileFriendList";
import ProfileFriendRequestList from "./../components/ProfileFriendRequestList";
import { FriendsContext } from "../contexts/FriendsContext";
import ProfileMenu from "./../components/ProfileMenu";

const ProfileFriends = () => {
  const context = useContext(FriendsContext);
  const { username } = useParams();

  useEffect(() => {
    context.setUsername(username);
  }, [username]);

  return (
    <div>
      <ProfileMenu />

      <Header as="h2" icon textAlign="center">
        <Icon name="users" circular />
        <Header.Content>Friends</Header.Content>
      </Header>

      <ProfileFriendRequestList users={context.friendRequests} />
      <ProfileFriendList users={context.friends} />
    </div>
  );
};

export default ProfileFriends;
