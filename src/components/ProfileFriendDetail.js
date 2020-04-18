import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ProfileFriendDetail = ({ user, handleUnfriend }) => {
  const { username } = user.attributes;

  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
        />
        <Card.Header as={Link} to={`/@${username}`}>
          {username}
        </Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button
            basic
            color="red"
            onClick={(e) => handleUnfriend(e, username)}
          >
            Unfriend
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProfileFriendDetail;
