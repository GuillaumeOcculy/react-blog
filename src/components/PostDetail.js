import React from "react";
import "./PostDetail.css";
function PostDetail({ post, user }) {
  const { body, created_at } = post.attributes;

  if (user) {
    return (
      <div className="ui card">
        <div className="content">
          <div className="header">{user.attributes.email}</div>
          <div className="meta">{created_at}</div>
          <div className="description">
            <p>{body}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default PostDetail;
