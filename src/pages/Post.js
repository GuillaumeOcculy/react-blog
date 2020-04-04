import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import MOT from "./../apis/MOT";
import PostDetail from "./../components/PostDetail";
import { PostContext } from "../contexts/PostContext";

function Post() {
  const context = useContext(PostContext);

  let { post_id } = useParams();
  const [post, setPost] = useState();
  const [user, setUser] = useState();
  const [usersLikedPost, setUsersLikedPost] = useState([]);

  async function getPost() {
    const response = await MOT.get(`/posts/${post_id}`);
    const { data, included } = response.data;

    const userId = data.relationships.user.data.id;
    const creator = included.find(
      (element) => element.id === userId && element.type === "user"
    );

    const usersLikedPost = context.getUsersLikedPost(data, included);

    setPost(data);
    setUser(creator);
    setUsersLikedPost(usersLikedPost);
  }

  useEffect(() => {
    getPost();
  }, []);

  function renderPost() {
    if (post) {
      return (
        <PostDetail
          post={post}
          creator={user}
          usersLikedPost={usersLikedPost}
        />
      );
    }

    return null;
  }
  return renderPost();
}

export default Post;
