import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Grid } from "semantic-ui-react";
import Moment from "react-moment";

import Text from "./utils/Text";
import PostLikeButton from "./PostLikeButton";
import MOT from "./../apis/MOT";

function PostDetail(props) {
  const [post, setPost] = useState(props.post);

  const { body, created_at, liked_by_current_user } = post.attributes;
  const likes = post.relationships.likes.data;

  function renderUser() {
    if (props.creator) {
      const { first_name, last_name } = props.creator.attributes;
      return first_name + " " + last_name;
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
    <Card centered={true} fluid={true}>
      <Card.Content>
        <Card.Header content={renderUser()}></Card.Header>
        <Card.Meta>
          <Link to={`/posts/${post.id}`} className="item">
            <Moment fromNow>{created_at}</Moment>
          </Link>
        </Card.Meta>
        <Card.Description>
          <Text text={body} />
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Grid>
          <Grid.Column floated="left" width={2}>
            0 comments
          </Grid.Column>
          <Grid.Column floated="right" width={2}>
            <PostLikeButton
              handleLike={handleLike}
              handleUnlike={handleUnlike}
              liked_by_current_user={liked_by_current_user}
            />
            {likes.length} likes
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );
}

export default PostDetail;
