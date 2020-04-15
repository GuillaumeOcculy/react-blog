import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "semantic-ui-react";

import useFetchUserApi from "./../hooks/useFetchUserApi";
import MOT from "../apis/MOT";
import UserDetail from "./../components/UserDetail";
import UserFriendshipButton from "./../components/UserFriendshipButton";

function User() {
  const { user_id } = useParams();
  const [{ user, isLoading, isError }] = useFetchUserApi(user_id);
  const [friendshipButtonClicked, setFriendshipButtonClicked] = useState(false);

  function renderUser() {
    if (user) {
      const friendshipStatus = user.attributes.current_user_friendship_status;

      return (
        <div>
          <div>
            <UserDetail user={user} />
          </div>

          <div>
            <UserFriendshipButton
              status={friendshipStatus}
              friendshipButtonClicked={friendshipButtonClicked}
              handleSendFriendRequest={handleSendFriendRequest}
            />
          </div>
        </div>
      );
    }

    return null;
  }

  const handleSendFriendRequest = async () => {
    await MOT.post("/friendships", {
      friend_id: user_id,
    })
      .then(function (response) {
        if (response.status === 201) {
          console.log(response);
          //   const status = response.data.data.attributes.status;
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

export default User;
