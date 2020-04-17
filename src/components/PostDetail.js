import React from "react";
import { Link } from "react-router-dom";
import { Card, Dropdown, Grid, Icon, Loader } from "semantic-ui-react";
import Moment from "react-moment";
import Pluralize from "pluralize";
import _ from "lodash";

import usePost from "./../hooks/usePost";

import Text from "./utils/Text";
import PostLikeButton from "./PostLikeButton";
import PostImage from "./PostImage";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import PostLikedUserList from "./PostLikedUserList";

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

  const { body, created_at, liked_by_current_user, image } = post.attributes;
  const likes = post.relationships.likes.data;
  const commentList = post.relationships.comments.data;

  function renderUser() {
    if (props.creator) {
      return props.creator.attributes.username;
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
          <PostLikedUserList users={usersLikedPost} />
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
          <div className="right floated meta">
            <Link to={`/posts/${post.id}`} className="item">
              <Moment fromNow>{created_at}</Moment>
            </Link>
          </div>
          <div className="left floated meta" style={{ fontSize: "20px" }}>
            <Link
              to={`/users/${props.creator.attributes.slug}`}
              className="item"
              style={{ textDecoration: "none" }}
            >
              {renderUser()}
            </Link>
          </div>
        </Card.Content>
        <PostImage image={image} />
        <Card.Content>
          <Card.Description>
            <Text text={body} />
          </Card.Description>
        </Card.Content>

        <Card.Content extra>
          <Grid>
            <Grid.Column floated="left" width={2}>
              <span
                onClick={handleClickUsersComment}
                style={{
                  cursor: `${_.isEmpty(commentList) ? null : "pointer"}`,
                }}
              >
                <Icon name="comment" />
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
                disabled={_.isEmpty(likes)}
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
      <CommentList comments={comments} users={usersCommentedPost} />
    </React.Fragment>
  );
}

export default PostDetail;
