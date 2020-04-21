import React from "react";
import { Comment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const MessageDetail = ({ message, user }) => {
  const { username } = user.attributes;
  const { body, created_at } = message.attributes;

  return (
    <Comment>
      <Comment.Avatar
        as="a"
        src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
      />
      <Comment.Content>
        <Comment.Author as={Link} to={`/@${username}`}>
          {username}
        </Comment.Author>
        <Comment.Metadata>
          <span>
            <Moment fromNow>{created_at}</Moment>
          </span>
        </Comment.Metadata>
        <Comment.Text>{body}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default MessageDetail;
