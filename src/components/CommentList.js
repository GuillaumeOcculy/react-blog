import React from "react";
import { Comment, Header } from "semantic-ui-react";
import _ from "lodash";
import CommentDetail from "./CommentDetail";

function CommentList({ comments, users }) {
  const list = comments.map((comment) => {
    const { id, type } = comment.relationships.user.data;
    const user = users.find((user) => user.id === id && user.type === type);

    return <CommentDetail key={comment.id} comment={comment} user={user} />;
  });

  function renderComments() {
    return (
      <Comment.Group>
        <Header as="h3" dividing>
          Comments
        </Header>
        {list}
      </Comment.Group>
    );
  }

  if (!_.isEmpty(users)) {
    return renderComments();
  } else {
    return null;
  }
}

export default CommentList;
