import React, { useContext } from "react";
import PostDetail from "./PostDetail";
import { PostContext } from "../contexts/PostContext";

function PostList({ posts, includes }) {
  const context = useContext(PostContext);

  function users() {
    return includes.filter((element) => element.type === "user");
  }

  function findCreator(post) {
    const { id } = post.relationships.user.data;
    const user = users().find((user) => user.id === id && user.type === "user");

    return user;
  }

  const list = posts.map((post) => {
    const usersLikedPost = context.getUsersLikedPost(post, includes);

    return (
      <PostDetail
        key={post.id}
        post={post}
        creator={findCreator(post)}
        usersLikedPost={usersLikedPost}
      />
    );
  });

  return list;
}

export default PostList;
