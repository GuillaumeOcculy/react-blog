import React from "react";
import { Comment } from "semantic-ui-react";
import Moment from "react-moment";

function CommentDetail({ comment, user }) {
  return (
    <Comment>
      <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
      <Comment.Content>
        <Comment.Author as="a">{user.attributes.username}</Comment.Author>
        <Comment.Metadata>
          <div>
            <Moment fromNow>{comment.attributes.created_at}</Moment>
          </div>
        </Comment.Metadata>
        <Comment.Text>{comment.attributes.body}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
}

export default CommentDetail;
