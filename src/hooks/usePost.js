import { useState } from "react";
import MOT from "../apis/MOT";

const useFetchPostApi = (postProps) => {
  const [post, setPost] = useState(postProps);
  const [likesLoading, setLikesLoading] = useState(false);
  const [usersLikedPost, setUsersLikedPost] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [usersCommentedPost, setUsersCommentedPost] = useState([]);
  const [commentsOpened, setCommentsOpened] = useState(false);

  const pathLikes = `/posts/${post.id}/likes`;
  const pathComments = `/posts/${post.id}/comments`;

  async function handleLike() {
    const response = await MOT.post(pathLikes);

    setPost(response.data.data);
  }

  async function handleUnlike() {
    const response = await MOT.delete(pathLikes);

    setPost(response.data.data);
  }

  async function handleClickUsersLike() {
    setLikesLoading(true);
    const response = await MOT.get(pathLikes);
    const { included } = response.data;

    const usersLikedPost = included.filter(
      (element) => element.type === "user"
    );

    setUsersLikedPost(usersLikedPost);
    setLikesLoading(false);
  }

  async function handleClickUsersComment() {
    if (commentsOpened) {
      return null;
    }

    setCommentsLoading(true);
    const response = await MOT.get(pathComments);
    const { data, included } = response.data;

    const usersCommentedPost = included.filter(
      (element) => element.type === "user"
    );

    setComments(data);
    setUsersCommentedPost(usersCommentedPost);
    setCommentsLoading(false);
    setCommentsOpened(true);
  }

  return [
    {
      post,
      likesLoading,
      usersLikedPost,
      commentsLoading,
      comments,
      usersCommentedPost,
    },
    {
      setPost,
      handleLike,
      handleUnlike,
      handleClickUsersLike,
      handleClickUsersComment,
    },
  ];
};

export default useFetchPostApi;
