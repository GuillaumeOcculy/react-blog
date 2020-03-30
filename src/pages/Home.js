import React, { useState, useEffect } from "react";
import PostList from "./../components/PostList";
import MOT from "./../apis/MOT";

function Home() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  async function getPosts() {
    const response = await MOT.get("/posts");
    const { data, included } = response.data;
    const posts = data.filter(element => element.type === "post");
    const users = included.filter(element => element.type === "user");

    setPosts(posts);
    setUsers(users);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return <div>{<PostList posts={posts} users={users} />}</div>;
}

export default Home;
