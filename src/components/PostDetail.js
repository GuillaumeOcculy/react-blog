import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PostDetail.css";
import avatar from "./../img/elliot.jpg";
import Text from "./utils/Text";
import MOT from "./../apis/MOT";

function PostDetail(props, { creator }) {
  const [post, setPost] = useState(props.post);

  const { body, created_at } = post.attributes;
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
          <i className="heart outline like icon" onClick={handleLike}></i>
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
