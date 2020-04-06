import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Dropdown, Grid, Loader } from "semantic-ui-react";
import Moment from "react-moment";
import Pluralize from "pluralize";
import _ from "lodash";

import MOT from "./../apis/MOT";
import Text from "./utils/Text";
import PostLikeButton from "./PostLikeButton";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function PostDetail(props) {
  const [post, setPost] = useState(props.post);
  const [usersLikedPost, setUsersLikedPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [likesLoading, setLikesLoading] = useState(false);
  const [usersCommentedPost, setUsersCommentedPost] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);

  const pathLikes = `/posts/${post.id}/likes`;
  const pathComments = `/posts/${post.id}/comments`;

  const { body, created_at, liked_by_current_user } = post.attributes;
  const likes = post.relationships.likes.data;
  const commentList = post.relationships.comments.data;

  function renderUser() {
    if (props.creator) {
      const { first_name, last_name } = props.creator.attributes;
      return first_name + " " + last_name;
    }
  }

  async function handleLike() {
    const response = await MOT.post(pathLikes);

    setPost(response.data.data);
  }

  async function handleUnlike() {
    const response = await MOT.delete(pathLikes);

    setPost(response.data.data);
  }

  async function handleClickUsersLike() {
    setLikesLoading(true);
    const response = await MOT.get(pathLikes);
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

  async function handleClickUsersComment() {
    setCommentsLoading(true);
    const response = await MOT.get(pathComments);
    const { data, included } = response.data;

    const usersCommentedPost = included.filter(
      (element) => element.type === "user"
    );

    setComments(data);
    setUsersCommentedPost(usersCommentedPost);
    setCommentsLoading(false);
  }

  function renderCommentedUsers() {
    if (!_.isEmpty(usersCommentedPost)) {
      return <CommentList comments={comments} users={usersCommentedPost} />;
    }
  }

  function renderDropdownMenu() {
    if (commentsLoading) {
      return <Loader active inline="centered" />;
    }

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
    handleClickUsersComment();
  }

  return (
    <React.Fragment>
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
              <span onClick={handleClickUsersComment}>
                {Pluralize("comment", commentList.length, true)}
              </span>
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

      {renderCommentedUsers()}
    </React.Fragment>
  );
}

export default PostDetail;
