import React, { createContext } from "react";
import _ from "lodash";

const PostContext = createContext();

function PostContextProvider(props) {
  function getUsersLikedPost(post, includes) {
    const likes = includes.filter(
      (element) =>
        element.type === "like" &&
        element.attributes.likeable_type === "Post" &&
        element.attributes.likeable_id === post.id
    );

    const likedUserIds = likes.map(
      (element) => element.relationships.user.data.id
    );

    const likedUsers = includes.filter(
      (element) => element.type === "user" && likedUserIds.includes(element.id)
    );

    const uniqUsersLikedPost = _.uniqBy(likedUsers, "id");

    return uniqUsersLikedPost;
  }

  return (
    <PostContext.Provider value={{ getUsersLikedPost }}>
      {props.children}
    </PostContext.Provider>
  );
}
export { PostContext, PostContextProvider };
