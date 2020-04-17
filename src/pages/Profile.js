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

  const { user_id } = useParams();
  const [{ user, isLoading, isError }] = useFetchUserApi(user_id);
  const [friendshipButtonClicked, setFriendshipButtonClicked] = useState(false);
  const isUser = user && user.id === context.currentUserId();

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

  const handleSendFriendRequest = async () => {
    await BlogAPI.post("/friendships", {
      friend_id: user_id,
    })
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
