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
      const { data } = response.data;

      setFriends(data);
    }

    async function fetchFriendRequests() {
      const response = await BlogAPI.get(`/users/${username}/friend_requests`);
      const { data } = response.data;

      setFriendRequests(data);
    }

    fetchFriends();
    fetchFriendRequests();
  }, [friendRequests.length]);

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

  const handleAcceptRequest = (e, username) => {
    e.preventDefault();
    BlogAPI.patch(`/friend_requests/${username}/accept`)
      .then(function (response) {
        if (response.status === 200) {
          setFriendRequests(response.data.data);
        } else {
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(JSON.stringify(error.response));
      });
  };

  const handleDeclineRequest = (e, username) => {
    e.preventDefault();
    BlogAPI.patch(`/friend_requests/${username}/decline`)
      .then(function (response) {
        if (response.status === 200) {
          setFriendRequests(response.data.data);
        } else {
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(JSON.stringify(error.response));
      });
  };

  const handleUnfriend = (e, username) => {
    e.preventDefault();
    BlogAPI.delete(`/friends/${username}`)
      .then(function (response) {
        if (response.status === 200) {
          setFriends(response.data.data);
        } else {
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(JSON.stringify(error.response));
      });
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
      <ProfileFriendRequestList
        users={friendRequests}
        handleAcceptRequest={handleAcceptRequest}
        handleDeclineRequest={handleDeclineRequest}
      />
      <ProfileFriendList users={friends} handleUnfriend={handleUnfriend} />
    </div>
    // </Grid.Column>
    // </Grid>
  );
};

export default ProfileFriends;
