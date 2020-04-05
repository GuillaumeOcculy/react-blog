import React from "react";

function PostLikeButton({ liked_by_current_user, handleLike, handleUnlike }) {
  function renderLikeButton() {
    return (
      <i
        className={`heart ${
          liked_by_current_user ? "red" : "outline"
        } like icon`}
        onClick={liked_by_current_user ? handleUnlike : handleLike}
      ></i>
    );
  }

  return renderLikeButton();
}

export default PostLikeButton;
