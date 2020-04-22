import React from "react";
import { Menu } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";

import ConversationForm from "./../components/ConversationForm";

const ProfileMessageNew = () => {
  const { username } = useParams();

  const RenderMenu = () => {
    return (
      <div className="ui two column centered grid">
        <Menu secondary>
          <Menu.Item name="home" as={Link} to={`/@${username}`} />
          <Menu.Item name="friends" as={Link} to={`/@${username}/friends`} />
          <Menu.Item
            name="messages"
            active
            as={Link}
            to={`/@${username}/messages`}
          />
        </Menu>
      </div>
    );
  };

  return (
    <div>
      <RenderMenu />
      <div style={{ marginTop: "100px" }}>
        <ConversationForm username={username} />
      </div>
    </div>
  );
};

export default ProfileMessageNew;
