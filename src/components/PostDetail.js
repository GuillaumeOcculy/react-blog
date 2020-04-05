import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PostDetail.css";
import avatar from "./../img/elliot.jpg";
import Text from "./utils/Text";
import PostLikeButton from "./PostLikeButton";
import MOT from "./../apis/MOT";

function PostDetail(props, { creator }) {
  const [post, setPost] = useState(props.post);

  const { body, created_at, liked_by_current_user } = post.attributes;
  const likes = post.relationships.likes.data;

  function renderUser() {
    if (creator) {
      return creator.attributes.email;
    }
  }

  async function handleLike() {
    const response = await MOT.post(`/posts/${post.id}/likes`);

    setPost(response.data.data);
  }

  async function handleUnlike() {
    const response = await MOT.delete(`/posts/${post.id}/likes`);

    setPost(response.data.data);
  }

  return (
    <div className="ui card">
      <div className="content">
        <div className="right floated meta">
          <Link to={`/posts/${post.id}`} className="item">
            {created_at}
          </Link>
        </div>
        <img className="ui avatar image" src={avatar} alt="" /> {renderUser()}
      </div>
      <div className="description">
        <Text text={body} />
      </div>
      <div className="content">
        <span className="right floated">
          <PostLikeButton
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            liked_by_current_user={liked_by_current_user}
          />
          {likes.length} likes
        </span>
        <i className="comment icon"></i>3 comments
      </div>
      <div className="extra content">
        <div className="ui large transparent left icon input">
          <i className="heart outline icon"></i>
          <input type="text" placeholder="Add Comment..." />
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
