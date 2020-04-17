import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "semantic-ui-react";

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

  function renderUser() {
    if (user) {
      return (
        <div>
          <div>
            <UserDetail user={user} />
          </div>

          <div>{renderFriendshipButton()}</div>
        </div>
      );
    }

    return null;
  }

  function renderFriendshipButton() {
    if (user && user.id != context.currentUserId()) {
      const friendshipStatus = user.attributes.current_user_friendship_status;
      return (
        <UserFriendshipButton
          status={friendshipStatus}
          friendshipButtonClicked={friendshipButtonClicked}
          handleSendFriendRequest={handleSendFriendRequest}
        />
      );
    }
  }

  const handleSendFriendRequest = async () => {
    await BlogAPI.post("/friendships", {
      friend_id: user_id,
    })
      .then(function (response) {
        if (response.status === 201) {
          console.log(response);
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
      {isLoading ? <Loader active inline="centered" /> : renderUser()}
    </div>
  );
}

export default Profile;
