import React from "react";
import { Button } from "semantic-ui-react";

function UserFriendshipButton({
  status,
  handleSendFriendRequest,
  friendshipButtonClicked,
}) {
  function renderButton() {
    switch (status) {
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
  }

  return renderButton();
}

export default UserFriendshipButton;
