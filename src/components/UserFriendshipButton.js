import React from "react";
import { Button } from "semantic-ui-react";

const UserFriendshipButton = ({
  isUser,
  handleSendFriendRequest,
  friendshipButtonClicked,
  user,
}) => {
  const friendshipStatus = user.attributes.current_user_friendship_status;

  if (isUser) {
    return null;
  }

  switch (friendshipStatus) {
    case "accepted":
      return null;
    case "pending":
      return <Button disabled>Pending</Button>;
    case "declined":
      return <Button disabled>Declined</Button>;
    default:
      return (
        <Button
          onClick={handleSendFriendRequest}
          disabled={friendshipButtonClicked}
        >
          Send friend request
        </Button>
      );
  }
};

export default UserFriendshipButton;
