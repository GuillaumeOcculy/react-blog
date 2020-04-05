import React from "react";
import PostDetail from "./PostDetail";

function PostList({ posts, includes }) {
  function users() {
    return includes.filter((element) => element.type === "user");
  }

  function findCreator(post) {
    const { id, type } = post.relationships.user.data;
    const user = users().find((user) => user.id === id && user.type === type);

    return user;
  }

  const list = posts.map((post) => {
    const creator = findCreator(post);

    return <PostDetail key={post.id} post={post} creator={creator} />;
  });

  return list;
}

export default PostList;
