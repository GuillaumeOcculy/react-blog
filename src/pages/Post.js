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

    const userData = data.relationships.user.data;
    const creator = included.find(
      (element) => element.id === userData.id && element.type === userData.type
    );

    setPost(data);
    setUser(creator);
  }

  useEffect(() => {
    getPost();
  }, []);

  function renderPost() {
    if (post) {
      return <PostDetail post={post} creator={user} />;
    }

    return null;
  }
  return renderPost();
}

export default Post;
