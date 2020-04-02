import React from "react";
import "./PostDetail.css";
import Text from "./utils/Text";

function PostDetail({ post, user }) {
  const { body, created_at } = post.attributes;

  function renderUser() {
    if (user) {
      return <div className="header">{user.attributes.email}</div>;
    }
  }
  return (
    <div className="ui card">
      <div className="content">
        {renderUser()}
        <div className="meta">{created_at}</div>
        <div className="description">
          <p>
            <Text text={body} />
          </p>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
