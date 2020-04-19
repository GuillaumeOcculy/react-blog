import React, { createContext, useState, useEffect } from "react";
import BlogAPI from "../apis/BlogAPI";

const FriendsContext = createContext();

const FriendsContextProvider = ({ children }) => {
  const [username, setUsername] = useState();
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    console.log("useEffect", username);
    if (username === undefined) {
      return;
    }

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
  }, [username, friendRequests.length]);

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
