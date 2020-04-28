import React, { useContext } from "react";
import { Menu } from "semantic-ui-react";
import { Link, useParams, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProfileMenu = () => {
  const { username } = useParams();
  const { pathname } = useLocation();

  const authContext = useContext(AuthContext);

  const RenderMenuCurrentUser = () => {
    if (
      authContext.loggedIn() &&
      authContext.currentUserUsername() === username
    ) {
      return (
        <React.Fragment>
          <Menu.Item
            name="friends"
            active={pathname.includes("friends")}
            as={Link}
            to={`/@${username}/friends`}
          />
          <Menu.Item
            name="messages"
            active={pathname.includes("messages")}
            as={Link}
            to={`/@${username}/messages`}
          />
        </React.Fragment>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="ui two column centered grid">
      <Menu secondary>
        <Menu.Item
          name="posts"
          active={
            !pathname.includes("friends") && !pathname.includes("messages")
          }
          as={Link}
          to={`/@${username}`}
        />
        <RenderMenuCurrentUser />
      </Menu>
    </div>
  );
};

export default ProfileMenu;
