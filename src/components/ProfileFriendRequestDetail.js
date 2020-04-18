import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ProfileFriendRequestDetail = ({
  user,
  handleAcceptRequest,
  handleDeclineRequest,
}) => {
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

        <Card.Description>
          {username} wants to add you as <strong> friend</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button
            basic
            color="green"
            onClick={(e) => handleAcceptRequest(e, username)}
          >
            Approve
          </Button>
          <Button
            basic
            color="red"
            onClick={(e) => handleDeclineRequest(e, username)}
          >
            Decline
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProfileFriendRequestDetail;
