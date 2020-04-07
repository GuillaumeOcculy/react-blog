import React from "react";
import { Link } from "react-router-dom";
import { Card, Dropdown, Grid, Loader } from "semantic-ui-react";
import Moment from "react-moment";
import Pluralize from "pluralize";
import _ from "lodash";

import Text from "./utils/Text";
import PostLikeButton from "./PostLikeButton";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

import usePost from "./../hooks/usePost";

function PostDetail(props) {
  const [
    {
      post,
      likesLoading,
      usersLikedPost,
      usersCommentedPost,
      comments,
      commentsLoading,
    },
    {
      setPost,
      handleLike,
      handleUnlike,
      handleClickUsersComment,
      handleClickUsersLike,
    },
  ] = usePost(props.post);

  const { body, created_at, liked_by_current_user } = post.attributes;
  const likes = post.relationships.likes.data;
  const commentList = post.relationships.comments.data;

  function renderUser() {
    if (props.creator) {
      const { first_name, last_name } = props.creator.attributes;
      return first_name + " " + last_name;
    }
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
