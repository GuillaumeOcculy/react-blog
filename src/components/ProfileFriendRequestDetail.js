import React, { useContext } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { FriendsContext } from "../contexts/FriendsContext";

const ProfileFriendRequestDetail = ({ user }) => {
  const context = useContext(FriendsContext);
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
            onClick={(e) => context.handleAcceptRequest(e, username)}
          >
            Approve
          </Button>
          <Button
            basic
            color="red"
            onClick={(e) => context.handleDeclineRequest(e, username)}
          >
            Decline
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProfileFriendRequestDetail;
