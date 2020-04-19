import React, { createContext, useState } from "react";
import useFetchFriendsApi from "../hooks/useFetchFriendsApi";

const FriendsContext = createContext();

const FriendsContextProvider = ({ children }) => {
  const [username, setUsername] = useState();
  const [
    { friends, friendRequests },
    {
      setFriends,
      setFriendRequests,
      handleAcceptRequest,
      handleDeclineRequest,
      handleUnfriend,
    },
  ] = useFetchFriendsApi(username);

  return (
    <FriendsContext.Provider
      value={{
        friends,
        friendRequests,
        setUsername,
        setFriends,
        setFriendRequests,
        handleAcceptRequest,
        handleDeclineRequest,
        handleUnfriend,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};

export { FriendsContext, FriendsContextProvider };
