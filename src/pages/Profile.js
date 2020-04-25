import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Header, Menu, Loader } from "semantic-ui-react";

import { AuthContext } from "../contexts/AuthContext";
import useFetchUserApi from "./../hooks/useFetchUserApi";
import BlogAPI from "../apis/BlogAPI";
import UserDetail from "./../components/UserDetail";
import UserFriendshipButton from "./../components/UserFriendshipButton";
import PostList from "./../components/PostList";

function Profile() {
  const context = useContext(AuthContext);

  const { username } = useParams();
  const [{ user, isLoading, isError }] = useFetchUserApi(username);
  const [posts, setPosts] = useState([]);
  const [includes, setIncludes] = useState([]);
  const [friendshipButtonClicked, setFriendshipButtonClicked] = useState(false);
  const isUser = context.loggedIn()
    ? user?.id === context.currentUserId()
    : false;

  useEffect(() => {
    async function getPosts() {
      const response = await BlogAPI.get(`/users/${username}/posts`);
      const { data, included } = response.data;
      const posts = data.filter((element) => element.type === "post");

      setIncludes(included);
      setPosts(posts);
    }

    getPosts();
  }, [username]);

  const RenderProfile = () => {
    return (
      <div>
        <RenderMenu />

        <Header as="h2" icon textAlign="center">
          <Header.Content>
            <RenderUser />
          </Header.Content>
        </Header>

        <PostList posts={posts} includes={includes} />
      </div>
    );
  };

  const RenderMenu = () => {
    if (!user) {
      return null;
    }

    const { username } = user.attributes;

    return (
      <div className="ui two column centered grid">
        <Menu secondary>
          <Menu.Item name="home" active as={Link} to={`/@${username}`} />
          <Menu.Item name="friends" as={Link} to={`/@${username}/friends`} />
          <Menu.Item name="messages" as={Link} to={`/@${username}/messages`} />
        </Menu>
      </div>
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
    <div>
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
