import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Menu, Loader } from "semantic-ui-react";

import { AuthContext } from "../contexts/AuthContext";
import useFetchUserApi from "./../hooks/useFetchUserApi";
import BlogAPI from "../apis/BlogAPI";
import UserDetail from "./../components/UserDetail";
import UserFriendshipButton from "./../components/UserFriendshipButton";

function Profile() {
  const context = useContext(AuthContext);

  const { username } = useParams();
  const [{ user, isLoading, isError }] = useFetchUserApi(username);
  const [friendshipButtonClicked, setFriendshipButtonClicked] = useState(false);
  const isUser = context.loggedIn()
    ? user?.id === context.currentUserId()
    : false;

  const RenderProfile = () => {
    return (
      <div>
        <RenderMenu />
        <RenderUser />
      </div>
    );
  };

  const RenderMenu = () => {
    if (!user) {
      return null;
    }

    const { username } = user.attributes;

    return (
      <Menu secondary>
        <Menu.Item name="home" active={true} as={Link} to={`/@${username}`} />
        <Menu.Item name="posts" as={Link} to={`/@${username}/posts`} />
        <Menu.Item name="friends" as={Link} to={`/@${username}/friends`} />
        <Menu.Item name="messages" as={Link} to={`/@${username}/messages`} />
      </Menu>
    );
  };

  const RenderUser = () => {
    if (user) {
      return (
        <div>
          <UserDetail user={user} />

          <br />

          <UserFriendshipButton
            isUser={isUser}
            user={user}
            friendshipButtonClicked={friendshipButtonClicked}
            handleSendFriendRequest={handleSendFriendRequest}
          />
        </div>
      );
    }

    return null;
  };

  const handleSendFriendRequest = () => {
    BlogAPI.post(`/users/${username}/friends`)
      .then(function (response) {
        if (response.status === 201) {
          setFriendshipButtonClicked(true);
        } else {
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(JSON.stringify(error.response));
      });
  };

  return (
    <div className="ui two column centered grid">
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <Loader active inline="centered" />
      ) : (
        <RenderProfile user={user} isUser={isUser} />
      )}
    </div>
  );
}

export default Profile;
