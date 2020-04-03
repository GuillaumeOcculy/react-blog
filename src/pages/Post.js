import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MOT from "./../apis/MOT";
import PostDetail from "./../components/PostDetail";

function Post() {
  let { post_id } = useParams();
  const [post, setPost] = useState();
  const [user, setUser] = useState();

  async function getPost() {
    const response = await MOT.get(`/posts/${post_id}`);
    const { data, included } = response.data;

    const userId = data.relationships.user.data.id;
    const userType = data.relationships.user.data.type;
    const user = included.find(
      element => element.id === userId && element.type === userType
    );

    setPost(data);
    setUser(user);
  }

  useEffect(() => {
    getPost();
  }, []);

  function renderPost() {
    if (post) {
      return <PostDetail post={post} user={user} />;
    }

    return null;
  }
  return renderPost();
}

export default Post;
