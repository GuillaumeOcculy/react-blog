import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MOT from "./../apis/MOT";
import PostDetail from "./../components/PostDetail";
import _ from "lodash";
function Post() {
  let { post_id } = useParams();
  const [post, setPost] = useState();
  const [user, setUser] = useState();
  const [likedUsers, setUniqLikedUsers] = useState([]);

  async function getPost() {
    const response = await MOT.get(`/posts/${post_id}`);
    const { data, included } = response.data;

    const userId = data.relationships.user.data.id;
    const likes = included.filter(
      (element) =>
        element.type === "like" && element.attributes.likeable_type === "Post"
    );

    const likedUserIds = likes.map(
      (element) => element.relationships.user.data.id
    );

    const likedUsers = included.filter(
      (element) => element.type === "user" && likedUserIds.includes(element.id)
    );

    const uniqLikedUsers = _.uniqBy(likedUsers, "id");

    const creator = included.find(
      (element) => element.id === userId && element.type === "user"
    );

    setPost(data);
    setUser(creator);
    setUniqLikedUsers(uniqLikedUsers);
  }

  useEffect(() => {
    getPost();
  }, []);

  function renderPost() {
    if (post) {
      return <PostDetail post={post} user={user} likedUsers={likedUsers} />;
    }

    return null;
  }
  return renderPost();
}

export default Post;
