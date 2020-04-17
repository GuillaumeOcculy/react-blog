import React, { useState, useEffect } from "react";
import PostList from "./../components/PostList";
import PostCreate from "./../components/PostCreate";
import BlogAPI from "./../apis/BlogAPI";

function Home() {
  const [posts, setPosts] = useState([]);
  const [includes, setIncludes] = useState([]);

  const addToPosts = (post) => {
    const newTodos = [...posts];
    newTodos.unshift(post);
    setPosts(newTodos);
  };

  async function getPosts() {
    const response = await BlogAPI.get("/posts");
    const { data, included } = response.data;
    const posts = data.filter((element) => element.type === "post");

    setIncludes(included);
    setPosts(posts);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {<PostCreate addToPosts={addToPosts} />}
      {<PostList posts={posts} includes={includes} />}
    </div>
  );
}

export default Home;
