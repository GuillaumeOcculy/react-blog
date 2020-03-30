import React from "react";
import PostDetail from "./PostDetail";

function PostList({ posts, users }) {
  function findUser(post) {
    const { id, type } = post.relationships.user.data;

    const user = users.find(user => user.id === id && user.type === type);

    return user;
  }

  const list = posts.map(post => {
    return <PostDetail key={post.id} post={post} user={findUser(post)} />;
  });

  return list;
}

export default PostList;
