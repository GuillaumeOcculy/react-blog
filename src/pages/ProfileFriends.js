import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Grid, Header, Icon, Menu, Loader } from "semantic-ui-react";

import BlogAPI from "../apis/BlogAPI";

import ProfileFriendList from "./../components/ProfileFriendList";
import ProfileFriendRequestList from "./../components/ProfileFriendRequestList";

const ProfileFriends = () => {
  const { username } = useParams();
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    async function fetchFriends() {
      const response = await BlogAPI.get(`/users/${username}/friends`);
      const { data, included } = response.data;

      const accepteds = data.filter(
        (element) => element.attributes.status === "accepted"
      );

      const requesteds = data.filter(
        (element) => element.attributes.status === "requested"
      );

      const friendIds = accepteds.map(
        (accepted) => accepted.attributes.friend_id
      );

      const requestedIds = requesteds.map(
        (accepted) => accepted.attributes.friend_id
      );

      const friends = included.filter(
        (element) => element.type === "user" && friendIds.includes(element.id)
      );

      const requestedFriends = included.filter(
        (element) =>
          element.type === "user" && requestedIds.includes(element.id)
      );

      setFriends(friends);
      setFriendRequests(requestedFriends);
    }

    fetchFriends();
  }, []);

  const RenderMenu = () => {
    return (
      <Menu secondary>
        <Menu.Item name="home" as={Link} to={`/@${username}`} />
        <Menu.Item name="posts" as={Link} to={`/@${username}/posts`} />
        <Menu.Item
          name="friends"
          active={true}
          as={Link}
          to={`/@${username}/friends`}
        />
        <Menu.Item name="messages" as={Link} to={`/@${username}/messages`} />
      </Menu>
    );
  };

  return (
    // <Grid centered columns={2}>
    // <Grid.Column>
    <div>
      <RenderMenu />
      <Header as="h2" icon textAlign="center">
        <Icon name="users" circular />
        <Header.Content>Friends</Header.Content>
      </Header>
      <ProfileFriendRequestList users={friendRequests} />
      <ProfileFriendList users={friends} />
    </div>
    // </Grid.Column>
    // </Grid>
  );
};

export default ProfileFriends;
