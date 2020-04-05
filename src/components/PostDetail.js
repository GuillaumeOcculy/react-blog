import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Grid, Dropdown } from "semantic-ui-react";
import Moment from "react-moment";
import _ from "lodash";

import Text from "./utils/Text";
import PostLikeButton from "./PostLikeButton";
import MOT from "./../apis/MOT";

function PostDetail(props) {
  const [post, setPost] = useState(props.post);
  const [usersLikedPost, setUsersLikedPost] = useState([]);
  const [likesLoading, setLikesLoading] = useState(false);

  const pathLike = `/posts/${post.id}/likes`;

  const { body, created_at, liked_by_current_user } = post.attributes;
  const likes = post.relationships.likes.data;

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

            <Dropdown
              text={`${likes.length} likes`}
              loading={likesLoading}
              onOpen={handleClickUsersLike}
            >
              {renderDropdownMenu()}
            </Dropdown>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );
}

export default PostDetail;
