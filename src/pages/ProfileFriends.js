import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Header, Icon, Menu } from "semantic-ui-react";

import ProfileFriendList from "./../components/ProfileFriendList";
import ProfileFriendRequestList from "./../components/ProfileFriendRequestList";
import { FriendsContext } from "../contexts/FriendsContext";

const ProfileFriends = () => {
  const context = useContext(FriendsContext);
  const { username } = useParams();

  useEffect(() => {
    context.setUsername(username);
  }, [username]);

  const RenderMenu = () => {
    return (
      <div className="ui two column centered grid">
        <Menu secondary>
          <Menu.Item name="home" as={Link} to={`/@${username}`} />
          <Menu.Item
            name="friends"
            active
            as={Link}
            to={`/@${username}/friends`}
          />
          <Menu.Item name="messages" as={Link} to={`/@${username}/messages`} />
        </Menu>
      </div>
    );
  };

  return (
    <div>
      <RenderMenu />

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
