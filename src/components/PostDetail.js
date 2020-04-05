import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Dropdown, Grid } from "semantic-ui-react";
import Moment from "react-moment";
import Pluralize from "pluralize";
import _ from "lodash";

import MOT from "./../apis/MOT";
import Text from "./utils/Text";
import PostLikeButton from "./PostLikeButton";
import CommentForm from "./CommentForm";

function PostDetail(props) {
  const [post, setPost] = useState(props.post);
  const [usersLikedPost, setUsersLikedPost] = useState([]);
  const [likesLoading, setLikesLoading] = useState(false);

  const pathLike = `/posts/${post.id}/likes`;

  const { body, created_at, liked_by_current_user } = post.attributes;
  const likes = post.relationships.likes.data;
  const comments = post.relationships.comments.data;

  function renderUser() {
    if (props.creator) {
      const { first_name, last_name } = props.creator.attributes;
      return first_name + " " + last_name;
    }
  }

  async function handleLike() {
    const response = await MOT.post(pathLike);

    setPost(response.data.data);
  }

  async function handleUnlike() {
    const response = await MOT.delete(pathLike);

    setPost(response.data.data);
  }

  async function handleClickUsersLike() {
    setLikesLoading(true);
    const response = await MOT.get(pathLike);
    const { included } = response.data;

    const usersLikedPost = included.filter(
      (element) => element.type === "user"
    );

    const list = usersLikedPost.map((user) => {
      const { first_name, last_name } = user.attributes;

      return (
        <Dropdown.Item key={user.id}>
          {first_name + " " + last_name}
        </Dropdown.Item>
      );
    });

    setUsersLikedPost(list);
    setLikesLoading(false);
  }

  function renderDropdownMenu() {
    if (!_.isEmpty(usersLikedPost)) {
      return (
        <Dropdown.Menu>
          <Dropdown.Header icon="users" content="Users" />
          <Dropdown.Divider />
          {usersLikedPost}
        </Dropdown.Menu>
      );
    }
  }

  function handleCommentSubmitSuccess(post) {
    setPost(post);
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
            {Pluralize("comment", comments.length, true)}
          </Grid.Column>
          <Grid.Column floated="right" width={2}>
            <PostLikeButton
              handleLike={handleLike}
              handleUnlike={handleUnlike}
              liked_by_current_user={liked_by_current_user}
            />

            <Dropdown
              text={Pluralize("like", likes.length, true)}
              loading={likesLoading}
              onOpen={handleClickUsersLike}
            >
              {renderDropdownMenu()}
            </Dropdown>
          </Grid.Column>
        </Grid>
      </Card.Content>

      <Card.Content extra>
        <CommentForm
          post={post}
          handleCommentSubmitSuccess={handleCommentSubmitSuccess}
        />
      </Card.Content>
    </Card>
  );
}

export default PostDetail;
